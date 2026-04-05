import type {
  AuthenticatedIdentity,
  ConnectRequest,
  SocketConnection,
  SocketMessage,
} from "../../shared/socket-types.js";
import type { RealtimeMetrics } from "../../shared/socket-runtime.js";
import type { AuthService } from "../services/auth-service.js";
import type { SubscriptionService } from "../services/subscription-service.js";
import type { DeliveryService } from "../services/delivery-service.js";
import type { RedisLikePubSubBroker } from "../broker/redis-like-pubsub.js";

export class RealtimeGateway {
  private readonly connections = new Map<string, SocketConnection>();
  private readonly messageSequenceByRoom = new Map<string, number>();

  public constructor(
    private readonly authService: AuthService,
    private readonly subscriptionService: SubscriptionService,
    private readonly deliveryService: DeliveryService,
    private readonly metrics: RealtimeMetrics,
    broker?: RedisLikePubSubBroker,
  ) {
    broker?.subscribe((roomName, event, payload) => {
      this.broadcastToRoom(roomName, event, payload, "cross-instance-room");
    });
  }

  public connect(request: ConnectRequest): SocketConnection {
    const identity = this.authService.authenticate(request.token);

    const existingConnection = this.findConnectionByUserId(identity.userId);

    if (existingConnection !== undefined) {
      this.metrics.recordReconnect(identity.userId);
    }

    const connection: SocketConnection = {
      connectionId: request.connectionId,
      identity,
      connectedAt: new Date().toISOString(),
      lastSeenAt: new Date().toISOString(),
      activeRooms: new Set<string>(),
      pendingDeliveryCount: 0,
      deliveryLog: [],
    };

    this.connections.set(connection.connectionId, connection);
    return connection;
  }

  public disconnect(connectionId: string): void {
    const connection = this.connections.get(connectionId);

    if (connection === undefined) {
      return;
    }

    connection.activeRooms.clear();
    this.connections.delete(connectionId);
  }

  public joinRoom(connectionId: string, roomName: string): void {
    const connection = this.getConnection(connectionId);
    this.subscriptionService.authorizeRoomJoin(this.requireIdentity(connection), roomName);
    connection.activeRooms.add(roomName);
  }

  public leaveRoom(connectionId: string, roomName: string): void {
    const connection = this.getConnection(connectionId);
    connection.activeRooms.delete(roomName);
  }

  public sendToConnection(connectionId: string, event: string, payload: unknown): void {
    const connection = this.getConnection(connectionId);
    this.deliver(connection, {
      event,
      payload,
      sequence: this.nextSequence(`connection:${connectionId}`),
    }, "single-connection");
  }

  public sendToUser(userId: string, event: string, payload: unknown): void {
    for (const connection of this.connections.values()) {
      if (connection.identity?.userId === userId) {
        this.deliver(connection, {
          event,
          payload,
          sequence: this.nextSequence(`user:${userId}`),
        }, "single-user");
      }
    }
  }

  public broadcastToRoom(roomName: string, event: string, payload: unknown, scope: string = "room"): void {
    const sequence = this.nextSequence(`room:${roomName}`);

    for (const connection of this.connections.values()) {
      if (connection.activeRooms.has(roomName)) {
        this.deliver(connection, {
          event,
          payload,
          sequence,
        }, scope);
      }
    }
  }

  public getConnection(connectionId: string): SocketConnection {
    const connection = this.connections.get(connectionId);

    if (connection === undefined) {
      throw new Error(`Connection ${connectionId} does not exist.`);
    }

    return connection;
  }

  public acknowledge(connectionId: string, count: number = 1): void {
    this.deliveryService.acknowledge(this.getConnection(connectionId), count);
  }

  public snapshot(): {
    readonly connectionIds: readonly string[];
    readonly roomSizes: Readonly<Record<string, number>>;
    readonly metrics: ReturnType<RealtimeMetrics["snapshot"]>;
  } {
    const roomSizes = this.buildRoomSizeSnapshot();

    return {
      connectionIds: [...this.connections.keys()],
      roomSizes,
      metrics: this.metrics.snapshot(this.connections.size, roomSizes),
    };
  }

  private requireIdentity(connection: SocketConnection): AuthenticatedIdentity {
    if (connection.identity === undefined) {
      throw new Error("Connection is not authenticated.");
    }

    return connection.identity;
  }

  private deliver(connection: SocketConnection, message: SocketMessage, scope: string): void {
    const delivered = this.deliveryService.deliver(connection, message);

    if (!delivered) {
      this.metrics.recordBlockedDelivery();
      throw new Error(`Connection ${connection.connectionId} is too far behind to receive more messages safely.`);
    }

    this.metrics.recordDelivery(scope);
  }

  private nextSequence(scopeKey: string): number {
    const nextSequence = (this.messageSequenceByRoom.get(scopeKey) ?? 0) + 1;
    this.messageSequenceByRoom.set(scopeKey, nextSequence);
    return nextSequence;
  }

  private buildRoomSizeSnapshot(): Readonly<Record<string, number>> {
    const roomSizes = new Map<string, number>();

    for (const connection of this.connections.values()) {
      for (const roomName of connection.activeRooms) {
        roomSizes.set(roomName, (roomSizes.get(roomName) ?? 0) + 1);
      }
    }

    return Object.fromEntries(roomSizes);
  }

  private findConnectionByUserId(userId: string): SocketConnection | undefined {
    for (const connection of this.connections.values()) {
      if (connection.identity?.userId === userId) {
        return connection;
      }
    }

    return undefined;
  }
}
