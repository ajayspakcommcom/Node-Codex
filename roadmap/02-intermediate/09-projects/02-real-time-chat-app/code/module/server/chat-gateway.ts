import type { ChatMetrics } from "../../shared/chat-runtime.js";
import { chatRuntime } from "../../shared/chat-runtime.js";
import type { ChatConnection, ChatEnvelope, ChatMessageRecord, ConnectRequest } from "../../shared/chat-types.js";
import type { RedisLikeChatBroker } from "../broker/redis-like-chat-broker.js";
import type { AuthService } from "../services/auth-service.js";
import type { DeliveryService } from "../services/delivery-service.js";
import type { MessageService } from "../services/message-service.js";
import type { ModerationService } from "../services/moderation-service.js";
import type { RoomService } from "../services/room-service.js";

export class ChatGateway {
  private readonly connections = new Map<string, ChatConnection>();

  public constructor(
    private readonly authService: AuthService,
    private readonly roomService: RoomService,
    private readonly messageService: MessageService,
    private readonly moderationService: ModerationService,
    private readonly deliveryService: DeliveryService,
    private readonly metrics: ChatMetrics,
    broker?: RedisLikeChatBroker,
  ) {
    broker?.subscribe((roomId, event, payload) => {
      this.broadcastToRoom(roomId, event, payload, true);
    });
  }

  public connect(request: ConnectRequest, nowEpochSeconds: number): ChatConnection {
    const identity = this.authService.authenticate(request.token);

    if (this.findConnectionByUserId(identity.userId) !== undefined) {
      this.metrics.recordReconnect();
    }

    const connection: ChatConnection = {
      connectionId: request.connectionId,
      identity,
      activeRooms: new Set<string>(),
      deliveryLog: [],
      connectedAtEpochSeconds: nowEpochSeconds,
      pendingDeliveryCount: 0,
      lastSeenAtEpochSeconds: nowEpochSeconds,
      status: "connected",
    };

    this.connections.set(connection.connectionId, connection);
    return connection;
  }

  public joinRoom(connectionId: string, roomId: string): void {
    const connection = this.getConnection(connectionId);
    this.roomService.authorizeRoomAccess(connection.identity, roomId);
    connection.activeRooms.add(roomId);
  }

  public leaveRoom(connectionId: string, roomId: string): void {
    this.getConnection(connectionId).activeRooms.delete(roomId);
  }

  public sendRoomMessage(input: {
    readonly connectionId: string;
    readonly roomId: string;
    readonly body: string;
    readonly nowEpochSeconds: number;
    readonly broker?: RedisLikeChatBroker;
  }): ChatMessageRecord {
    const connection = this.getConnection(input.connectionId);
    if (!connection.activeRooms.has(input.roomId)) {
      throw new Error(`Connection ${input.connectionId} is not joined to ${input.roomId}.`);
    }

    const message = this.messageService.createMessage({
      roomId: input.roomId,
      author: connection.identity,
      body: input.body,
      nowEpochSeconds: input.nowEpochSeconds,
    });

    const payload = {
      messageId: message.messageId,
      authorUserId: message.authorUserId,
      body: message.body,
      sequence: message.sequence,
    };

    this.broadcastToRoom(input.roomId, "chat.message", payload, false);
    input.broker?.publish(input.roomId, "chat.message", payload);
    return message;
  }

  public muteUser(input: {
    readonly connectionId: string;
    readonly roomId: string;
    readonly targetUserId: string;
  }): void {
    const connection = this.getConnection(input.connectionId);
    this.moderationService.muteUser({
      roomId: input.roomId,
      actor: connection.identity,
      targetUserId: input.targetUserId,
    });
  }

  public history(connectionId: string, roomId: string): readonly ChatMessageRecord[] {
    const connection = this.getConnection(connectionId);
    return this.messageService.historyFor(connection.identity, roomId);
  }

  public acknowledge(connectionId: string, count: number = 1): void {
    this.deliveryService.acknowledge(this.getConnection(connectionId), count);
  }

  public cleanupStaleConnections(nowEpochSeconds: number): readonly string[] {
    const removed: string[] = [];

    for (const connection of this.connections.values()) {
      if (nowEpochSeconds - connection.lastSeenAtEpochSeconds > chatRuntime.staleConnectionThresholdSeconds) {
        connection.activeRooms.clear();
        connection.status = "disconnected";
        this.connections.delete(connection.connectionId);
        removed.push(connection.connectionId);
      }
    }

    return removed;
  }

  public snapshot(): {
    readonly activeConnectionIds: readonly string[];
    readonly roomSizes: Readonly<Record<string, number>>;
    readonly metrics: ReturnType<ChatMetrics["snapshot"]>;
  } {
    const roomSizes = new Map<string, number>();

    for (const connection of this.connections.values()) {
      for (const roomId of connection.activeRooms) {
        roomSizes.set(roomId, (roomSizes.get(roomId) ?? 0) + 1);
      }
    }

    return {
      activeConnectionIds: [...this.connections.keys()],
      roomSizes: Object.fromEntries(roomSizes),
      metrics: this.metrics.snapshot(this.connections.size),
    };
  }

  public getConnection(connectionId: string): ChatConnection {
    const connection = this.connections.get(connectionId);

    if (connection === undefined) {
      throw new Error(`Unknown connection: ${connectionId}`);
    }

    return connection;
  }

  private broadcastToRoom(roomId: string, event: string, payload: unknown, isCrossInstance: boolean): void {
    const recipients = [...this.connections.values()].filter((connection) => connection.activeRooms.has(roomId));
    const sequence = this.deriveSequence(payload);

    for (const connection of recipients) {
      const delivered = this.deliveryService.deliver(connection, {
        event,
        roomId,
        sequence,
        payload,
      });

      if (!delivered) {
        this.metrics.recordBlockedDelivery();
        throw new Error(`Connection ${connection.connectionId} is too far behind for safe delivery.`);
      }
    }

    if (isCrossInstance) {
      this.metrics.recordCrossInstanceDelivery();
    }
  }

  private deriveSequence(payload: unknown): number {
    if (typeof payload === "object" && payload !== null && "sequence" in payload) {
      const maybeSequence = (payload as { readonly sequence?: unknown }).sequence;

      if (typeof maybeSequence === "number") {
        return maybeSequence;
      }
    }

    return 0;
  }

  private findConnectionByUserId(userId: string): ChatConnection | undefined {
    for (const connection of this.connections.values()) {
      if (connection.identity.userId === userId) {
        return connection;
      }
    }

    return undefined;
  }
}
