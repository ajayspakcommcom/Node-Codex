import { logger } from "./shared/logger.js";
import { deploymentWorkflow, riskyWorkflow } from "./shared/cicd-runtime.js";
import { DeploymentGuardrailAdvisor } from "./module/workflow/deployment-guardrail-advisor.js";

const advisor = new DeploymentGuardrailAdvisor();

logger.warn("Deployment guardrails", {
  deployment: advisor.assess(deploymentWorkflow),
  risky: advisor.assess(riskyWorkflow),
});
