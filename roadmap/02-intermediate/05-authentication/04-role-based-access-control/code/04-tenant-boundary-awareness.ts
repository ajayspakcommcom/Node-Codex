import { OrderAuthorizationService } from "./module/services/order-authorization-service.js";
import { RbacPolicyEngine } from "./module/services/rbac-policy-engine.js";
import { principals, exampleOrder } from "./shared/rbac-runtime.js";
import { logger } from "./shared/logger.js";

const orderAuthorizationService = new OrderAuthorizationService(new RbacPolicyEngine());

logger.warn("Tenant boundary awareness", {
  externalTenantManagerCanRefund: orderAuthorizationService.canRefundOrder(principals.externalTenantManager, exampleOrder),
  explanation: "A valid role in one tenant should not automatically grant actions against another tenant's resources.",
  guidance: "Enterprise RBAC must combine role checks with tenant boundaries whenever the system is multi-tenant.",
});
