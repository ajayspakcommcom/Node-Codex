import { logger } from "./shared/logger.js";
import { productionConfig, riskyConfig } from "./shared/config-runtime.js";
import { ConfigLoader } from "./module/config/config-loader.js";
import { DeploymentSafetyAdvisor } from "./module/config/deployment-safety-advisor.js";

const loader = new ConfigLoader();
const advisor = new DeploymentSafetyAdvisor();

logger.warn("Deployment safety", {
  production: advisor.assess(loader.load(productionConfig)),
  risky: advisor.assess(loader.load(riskyConfig)),
});
