import type { ChatIdentity, RoomRecord } from "./chat-types.js";

export const chatRuntime = {
  defaultNowEpochSeconds: 1_775_338_800,
  staleConnectionThresholdSeconds: 120,
  maxPendingDeliveries: 3,
} as const;

export const seededIdentitiesByToken: Readonly<Record<string, ChatIdentity>> = {
  "token:member:alpha": {
    userId: "user_member_alpha",
    tenantId: "tenant_alpha",
    displayName: "Maya",
    roles: ["member"],
  },
  "token:member:alpha:two": {
    userId: "user_member_alpha_two",
    tenantId: "tenant_alpha",
    displayName: "Ravi",
    roles: ["member"],
  },
  "token:moderator:alpha": {
    userId: "user_moderator_alpha",
    tenantId: "tenant_alpha",
    displayName: "Leah",
    roles: ["moderator"],
  },
  "token:admin:beta": {
    userId: "user_admin_beta",
    tenantId: "tenant_beta",
    displayName: "Sara",
    roles: ["admin"],
  },
} as const;

export const seededRooms: readonly RoomRecord[] = [
  {
    roomId: "room_alpha_general",
    tenantId: "tenant_alpha",
    name: "general",
    participantUserIds: ["user_member_alpha", "user_member_alpha_two", "user_moderator_alpha"],
    mutedUserIds: [],
    isPrivate: false,
  },
  {
    roomId: "room_alpha_incident",
    tenantId: "tenant_alpha",
    name: "incident-response",
    participantUserIds: ["user_moderator_alpha", "user_member_alpha"],
    mutedUserIds: [],
    isPrivate: true,
  },
  {
    roomId: "room_beta_general",
    tenantId: "tenant_beta",
    name: "general",
    participantUserIds: ["user_admin_beta"],
    mutedUserIds: [],
    isPrivate: false,
  },
] as const;

export function cloneSeedRooms(): RoomRecord[] {
  return seededRooms.map((room) => ({
    ...room,
    participantUserIds: [...room.participantUserIds],
    mutedUserIds: [...room.mutedUserIds],
  }));
}

export class ChatMetrics {
  private reconnectCount = 0;
  private blockedDeliveries = 0;
  private crossInstanceDeliveries = 0;

  public recordReconnect(): void {
    this.reconnectCount += 1;
  }

  public recordBlockedDelivery(): void {
    this.blockedDeliveries += 1;
  }

  public recordCrossInstanceDelivery(): void {
    this.crossInstanceDeliveries += 1;
  }

  public snapshot(activeConnections: number): {
    readonly activeConnections: number;
    readonly reconnectCount: number;
    readonly blockedDeliveries: number;
    readonly crossInstanceDeliveries: number;
  } {
    return {
      activeConnections,
      reconnectCount: this.reconnectCount,
      blockedDeliveries: this.blockedDeliveries,
      crossInstanceDeliveries: this.crossInstanceDeliveries,
    };
  }
}
