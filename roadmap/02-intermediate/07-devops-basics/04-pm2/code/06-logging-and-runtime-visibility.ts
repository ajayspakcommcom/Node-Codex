import { logger } from "./shared/logger.js";
import { productionApiSpec, riskyPm2Spec } from "./shared/pm2-runtime.js";
import { RuntimeVisibilityAdvisor } from "./module/pm2/runtime-visibility-advisor.js";

const advisor = new RuntimeVisibilityAdvisor();

logger.info("Logging and runtime visibility", {
  production: advisor.assess(productionApiSpec),
  risky: advisor.assess(riskyPm2Spec),
});
