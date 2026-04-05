import { RouteGuard } from "./module/services/route-guard.js";
import { RbacPolicyEngine } from "./module/services/rbac-policy-engine.js";
import { principals, exampleOrder } from "./shared/rbac-runtime.js";
import { logger } from "./shared/logger.js";

const routeGuard = new RouteGuard(new RbacPolicyEngine());

logger.info("Route-level authorization", {
  memberRouteAccess: routeGuard.canEnterRoute(principals.member, "orders:read", {
    principal: principals.member,
    resourceTenantId: exampleOrder.tenantId,
  }),
  externalManagerRouteAccess: routeGuard.canEnterRoute(principals.externalTenantManager, "orders:refund", {
    principal: principals.externalTenantManager,
    resourceTenantId: exampleOrder.tenantId,
  }),
  guidance: "Route guards are useful for early rejection, but they should not be the only place critical business authorization is enforced.",
});
