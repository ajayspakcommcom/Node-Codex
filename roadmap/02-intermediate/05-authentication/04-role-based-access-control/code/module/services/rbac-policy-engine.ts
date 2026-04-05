import { permissionMap } from "../policies/permission-map.js";
import type { AuthorizationContext, Permission, Principal } from "../../shared/rbac-types.js";

export class RbacPolicyEngine {
  public listPermissions(principal: Principal): readonly Permission[] {
    return [...new Set(principal.roles.flatMap((role) => permissionMap[role]))];
  }

  public hasPermission(principal: Principal, permission: Permission): boolean {
    return this.listPermissions(principal).includes(permission);
  }

  public evaluate(principal: Principal, permission: Permission, context: AuthorizationContext): boolean {
    if (!this.hasPermission(principal, permission)) {
      return false;
    }

    if (context.resourceTenantId !== undefined && context.resourceTenantId !== principal.tenantId) {
      return false;
    }

    if (permission === "orders:read" && principal.roles.includes("member")) {
      return context.resourceOwnerUserId === undefined || context.resourceOwnerUserId === principal.userId;
    }

    if (permission === "support:impersonate-readonly") {
      return context.resourceTenantId === principal.tenantId;
    }

    if (permission === "orders:refund" && context.orderStatus === "refunded") {
      return false;
    }

    return true;
  }
}
