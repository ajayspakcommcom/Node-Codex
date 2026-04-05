import type { StoredOrder, UserContext } from "../../shared/testing-types.js";

export class AccessPolicyService {
  public canViewOrder(user: UserContext, order: StoredOrder): boolean {
    if (user.roles.includes("platform_admin")) {
      return true;
    }

    if (user.tenantId !== order.tenantId) {
      return false;
    }

    if (user.userId === order.ownerUserId) {
      return true;
    }

    if (user.roles.includes("admin") || user.roles.includes("manager")) {
      return true;
    }

    if (user.roles.includes("support")) {
      return order.status !== "payment_pending";
    }

    return false;
  }

  public assertCanViewOrder(user: UserContext, order: StoredOrder): void {
    if (!this.canViewOrder(user, order)) {
      throw new Error("User is not allowed to view this order");
    }
  }
}
