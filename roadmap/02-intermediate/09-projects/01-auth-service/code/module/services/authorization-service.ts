import type { AuthenticatedPrincipal, AuthorizationContext, Permission } from "../../shared/auth-service-types.js";
import { permissionMap } from "../policies/permission-map.js";

export class AuthorizationService {
  public listPermissions(principal: {
    readonly roles: readonly ("member" | "support" | "admin")[];
  }): readonly Permission[] {
    return [...new Set(principal.roles.flatMap((role) => permissionMap[role]))];
  }

  public can(principal: AuthenticatedPrincipal, permission: Permission, context: AuthorizationContext = {}): boolean {
    if (!principal.permissions.includes(permission)) {
      return false;
    }

    if (context.resourceTenantId !== undefined && context.resourceTenantId !== principal.tenantId) {
      return false;
    }

    if (permission === "sessions:revoke") {
      return principal.roles.includes("admin") || context.targetUserId === principal.userId;
    }

    if (permission === "tenant:manage") {
      return principal.roles.includes("admin");
    }

    if (permission === "support:assist") {
      return principal.roles.includes("support") || principal.roles.includes("admin");
    }

    return true;
  }

  public require(principal: AuthenticatedPrincipal, permission: Permission, context: AuthorizationContext = {}): void {
    if (!this.can(principal, permission, context)) {
      throw new Error(`Permission denied for ${permission}.`);
    }
  }
}
