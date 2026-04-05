import { logger } from "./shared/logger.js";
import { productionApiSpec, riskyPm2Spec } from "./shared/pm2-runtime.js";
import { ClusterModeAdvisor } from "./module/pm2/cluster-mode-advisor.js";

const advisor = new ClusterModeAdvisor();

logger.info("Cluster mode awareness", {
  production: advisor.assess(productionApiSpec),
  risky: advisor.assess(riskyPm2Spec),
});
