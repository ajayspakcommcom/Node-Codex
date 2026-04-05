import { TransactionBoundaryAdvisor } from "./module/advisors/transaction-boundary-advisor.js";
import { checkoutWorkflowSteps } from "./shared/transaction-runtime.js";
import { logger } from "./shared/logger.js";

const advisor = new TransactionBoundaryAdvisor();
const recommendation = advisor.recommend(checkoutWorkflowSteps);

logger.info("Transaction boundary design", {
  workflowSteps: checkoutWorkflowSteps,
  recommendation,
  guidance: "Enterprise transactions should usually keep only the atomic database work inside the boundary and push notifications, queue work, and remote calls after commit.",
});
