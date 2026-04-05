import { logger } from "./shared/logger.js";
import { deploymentWorkflow, riskyWorkflow } from "./shared/cicd-runtime.js";
import { SecretsAdvisor } from "./module/workflow/secrets-advisor.js";

const advisor = new SecretsAdvisor();

logger.warn("Secret handling awareness", {
  deployment: advisor.assess(deploymentWorkflow),
  risky: advisor.assess(riskyWorkflow),
});
