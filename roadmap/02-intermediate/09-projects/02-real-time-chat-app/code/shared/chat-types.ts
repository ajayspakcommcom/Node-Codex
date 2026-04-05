export type ChatRole = "member" | "moderator" | "admin";
export type ConnectionStatus = "connected" | "disconnected";

export interface ChatIdentity {
  readonly userId: string;
  readonly tenantId: string;
  readonly displayName: string;
  readonly roles: readonly ChatRole[];
}

export interface ConnectRequest {
  readonly connectionId: string;
  readonly token: string;
}

export interface ChatEnvelope {
  readonly event: string;
  readonly roomId: string;
  readonly sequence: number;
  readonly payload: unknown;
}

export interface ChatConnection {
  readonly connectionId: string;
  readonly identity: ChatIdentity;
  readonly activeRooms: Set<string>;
  readonly deliveryLog: ChatEnvelope[];
  readonly connectedAtEpochSeconds: number;
  pendingDeliveryCount: number;
  lastSeenAtEpochSeconds: number;
  status: ConnectionStatus;
}

export interface RoomRecord {
  readonly roomId: string;
  readonly tenantId: string;
  readonly name: string;
  readonly participantUserIds: readonly string[];
  readonly mutedUserIds: readonly string[];
  readonly isPrivate: boolean;
}

export interface ChatMessageRecord {
  readonly messageId: string;
  readonly roomId: string;
  readonly tenantId: string;
  readonly authorUserId: string;
  readonly body: string;
  readonly createdAtEpochSeconds: number;
  readonly sequence: number;
}
