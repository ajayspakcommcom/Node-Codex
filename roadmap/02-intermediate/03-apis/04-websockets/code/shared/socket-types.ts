export type UserRole = "admin" | "analyst" | "viewer";

export interface AuthenticatedIdentity {
  readonly userId: string;
  readonly tenantId: string;
  readonly role: UserRole;
}

export interface ConnectRequest {
  readonly connectionId: string;
  readonly token?: string;
}

export interface SocketMessage<TPayload = unknown> {
  readonly event: string;
  readonly payload: TPayload;
  readonly sequence: number;
}

export interface SocketConnection {
  readonly connectionId: string;
  identity?: AuthenticatedIdentity;
  connectedAt: string;
  lastSeenAt: string;
  activeRooms: Set<string>;
  pendingDeliveryCount: number;
  deliveryLog: SocketMessage[];
}

export interface RealtimeMetricsSnapshot {
  readonly activeConnections: number;
  readonly roomSizes: Readonly<Record<string, number>>;
  readonly deliveriesByScope: Readonly<Record<string, number>>;
  readonly reconnectsByUser: Readonly<Record<string, number>>;
  readonly blockedDeliveries: number;
}
