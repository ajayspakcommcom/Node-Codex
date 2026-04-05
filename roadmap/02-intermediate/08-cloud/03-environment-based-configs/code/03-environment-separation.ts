import { logger } from "./shared/logger.js";
import { localConfig, productionConfig, stagingConfig } from "./shared/config-runtime.js";

logger.info("Environment separation", {
  local: localConfig,
  staging: stagingConfig,
  production: productionConfig,
});
