import { RbacPolicyEngine } from "./rbac-policy-engine.js";
import type { OrderResource, Principal } from "../../shared/rbac-types.js";

export class OrderAuthorizationService {
  public constructor(private readonly policyEngine: RbacPolicyEngine) {}

  public canReadOrder(principal: Principal, order: OrderResource): boolean {
    return this.policyEngine.evaluate(principal, "orders:read", {
      principal,
      resourceTenantId: order.tenantId,
      resourceOwnerUserId: order.ownerUserId,
      orderStatus: order.status,
    });
  }

  public canRefundOrder(principal: Principal, order: OrderResource): boolean {
    return this.policyEngine.evaluate(principal, "orders:refund", {
      principal,
      resourceTenantId: order.tenantId,
      resourceOwnerUserId: order.ownerUserId,
      orderStatus: order.status,
    });
  }
}
