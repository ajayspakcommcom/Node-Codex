import { TransactionBoundaryAdvisor } from "./module/advisors/transaction-boundary-advisor.js";
import { invoiceWorkflowSteps } from "./shared/transaction-runtime.js";
import { logger } from "./shared/logger.js";

const advisor = new TransactionBoundaryAdvisor();
const recommendation = advisor.recommend(invoiceWorkflowSteps);

logger.info("Where transactions should stop", {
  workflowSteps: invoiceWorkflowSteps,
  insideBoundary: recommendation.insideBoundary,
  outsideBoundary: recommendation.outsideBoundary,
  warnings: recommendation.warnings,
  guidance: "Database writes may need atomicity, but object storage uploads and cross-service HTTP notifications should usually happen after commit or via an async workflow.",
});
