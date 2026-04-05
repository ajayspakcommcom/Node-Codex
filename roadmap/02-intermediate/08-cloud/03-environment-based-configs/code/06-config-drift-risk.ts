import { logger } from "./shared/logger.js";
import { localConfig, productionConfig, stagingConfig } from "./shared/config-runtime.js";
import { EnvironmentDriftAdvisor } from "./module/config/environment-drift-advisor.js";

const advisor = new EnvironmentDriftAdvisor();

logger.warn("Config drift risk", {
  assessment: advisor.compare([localConfig, stagingConfig, productionConfig]),
});
