import { logger } from "./shared/logger.js";
import { productionApiSpec, riskyPm2Spec } from "./shared/pm2-runtime.js";
import { RestartPolicyAdvisor } from "./module/pm2/restart-policy-advisor.js";

const advisor = new RestartPolicyAdvisor();

logger.info("Process supervision awareness", {
  production: advisor.assess(productionApiSpec),
  risky: advisor.assess(riskyPm2Spec),
});
