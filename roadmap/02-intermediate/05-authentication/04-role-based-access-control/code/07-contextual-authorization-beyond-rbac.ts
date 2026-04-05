import { OrderAuthorizationService } from "./module/services/order-authorization-service.js";
import { RbacPolicyEngine } from "./module/services/rbac-policy-engine.js";
import { principals, exampleOrder } from "./shared/rbac-runtime.js";
import { logger } from "./shared/logger.js";

const orderAuthorizationService = new OrderAuthorizationService(new RbacPolicyEngine());
const otherUserOrder = {
  ...exampleOrder,
  ownerUserId: "other_user",
};

logger.info("Contextual authorization beyond RBAC", {
  memberCanReadOwnOrder: orderAuthorizationService.canReadOrder(principals.member, exampleOrder),
  memberCanReadOtherUserOrder: orderAuthorizationService.canReadOrder(principals.member, otherUserOrder),
  guidance: "Static roles are often not enough. Enterprise authorization frequently also depends on ownership, tenant, or resource state context.",
});
