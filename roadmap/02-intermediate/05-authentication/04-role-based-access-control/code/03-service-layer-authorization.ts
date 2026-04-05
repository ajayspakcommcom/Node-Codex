import { OrderAuthorizationService } from "./module/services/order-authorization-service.js";
import { RbacPolicyEngine } from "./module/services/rbac-policy-engine.js";
import { principals, exampleOrder, refundedOrder } from "./shared/rbac-runtime.js";
import { logger } from "./shared/logger.js";

const orderAuthorizationService = new OrderAuthorizationService(new RbacPolicyEngine());

logger.info("Service-layer authorization", {
  memberCanReadOwnOrder: orderAuthorizationService.canReadOrder(principals.member, exampleOrder),
  managerCanRefundPlacedOrder: orderAuthorizationService.canRefundOrder(principals.manager, exampleOrder),
  managerCanRefundRefundedOrder: orderAuthorizationService.canRefundOrder(principals.manager, refundedOrder),
  guidance: "Service-layer authorization protects the actual business action, which is why enterprise systems should not rely only on route checks.",
});
