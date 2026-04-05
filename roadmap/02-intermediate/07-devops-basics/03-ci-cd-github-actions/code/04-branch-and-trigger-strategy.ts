import { logger } from "./shared/logger.js";
import { riskyWorkflow, validationWorkflow } from "./shared/cicd-runtime.js";

logger.info("Branch and trigger strategy", {
  validationTriggers: validationWorkflow.on,
  riskyTriggers: riskyWorkflow.on,
  recommendation: "Keep validation and deploy triggers explicit so pipeline intent is easy to reason about.",
});
