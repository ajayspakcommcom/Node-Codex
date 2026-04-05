import { logger } from "./shared/logger.js";
import { riskyWorkflow, validationWorkflow } from "./shared/cicd-runtime.js";
import { QualityGateAdvisor } from "./module/workflow/quality-gate-advisor.js";

const advisor = new QualityGateAdvisor();

logger.info("Lint and test jobs", {
  validation: advisor.assess(validationWorkflow),
  risky: advisor.assess(riskyWorkflow),
});
