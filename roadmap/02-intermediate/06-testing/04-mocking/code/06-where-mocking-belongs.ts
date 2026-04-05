import { logger } from "./shared/logger.js";
import { MockingBoundaryAdvisor } from "./module/advisors/mocking-boundary-advisor.js";

const advisor = new MockingBoundaryAdvisor();

logger.info("Where mocking belongs", {
  paymentGateway: advisor.recommendBoundary("payment_gateway"),
  repository: advisor.recommendBoundary("repository"),
  coreLogic: advisor.recommendBoundary("core_logic"),
});
