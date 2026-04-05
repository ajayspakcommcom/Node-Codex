import { logger } from "./shared/logger.js";
import { containerizedEnvironment, inMemoryEnvironment } from "./shared/test-db-runtime.js";
import { EnvironmentStrategyAdvisor } from "./module/advisors/environment-strategy-advisor.js";

const advisor = new EnvironmentStrategyAdvisor();

logger.info("In-memory vs real database tradeoffs", {
  inMemory: {
    config: inMemoryEnvironment,
    recommendation: advisor.recommend(inMemoryEnvironment),
  },
  containerized: {
    config: containerizedEnvironment,
    recommendation: advisor.recommend(containerizedEnvironment),
  },
});
