import { logger } from "./shared/logger.js";
import { deploymentWorkflow, validationWorkflow } from "./shared/cicd-runtime.js";
import { EnvironmentSeparationAdvisor } from "./module/workflow/environment-separation-advisor.js";

const advisor = new EnvironmentSeparationAdvisor();

logger.info("Environment separation", {
  validation: advisor.summarize(validationWorkflow),
  deployment: advisor.summarize(deploymentWorkflow),
});
