import { RbacPolicyEngine } from "./rbac-policy-engine.js";
import type { AuthorizationContext, Permission, Principal } from "../../shared/rbac-types.js";

export class RouteGuard {
  public constructor(private readonly policyEngine: RbacPolicyEngine) {}

  public canEnterRoute(principal: Principal, permission: Permission, context: AuthorizationContext): boolean {
    return this.policyEngine.hasPermission(principal, permission) &&
      (context.resourceTenantId === undefined || context.resourceTenantId === principal.tenantId);
  }
}
