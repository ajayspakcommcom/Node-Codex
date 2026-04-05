import { logger } from "./shared/logger.js";
import { enterpriseApiSpec, riskyApiSpec } from "./shared/docker-runtime.js";
import { LayerStrategyAdvisor } from "./module/build/layer-strategy-advisor.js";

const advisor = new LayerStrategyAdvisor();

logger.info("Layer order and caching comparison", {
  enterprise: advisor.assess(enterpriseApiSpec),
  risky: advisor.assess(riskyApiSpec),
});
