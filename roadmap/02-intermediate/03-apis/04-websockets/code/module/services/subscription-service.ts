import type { AuthenticatedIdentity } from "../../shared/socket-types.js";

export class SubscriptionService {
  public authorizeRoomJoin(identity: AuthenticatedIdentity, roomName: string): void {
    if (roomName === "ops:global" && identity.role !== "admin") {
      throw new Error("Only admins may subscribe to the ops:global room.");
    }

    if (roomName.startsWith("tenant:")) {
      const requestedTenant = roomName.split(":")[1];

      if (requestedTenant !== identity.tenantId) {
        throw new Error("Cross-tenant room joins are not allowed.");
      }
    }
  }
}
