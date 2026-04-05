import { logger } from "./shared/logger.js";
import { localConfig, productionConfig, stagingConfig } from "./shared/config-runtime.js";

logger.info("Local, staging, and production comparison", {
  local: {
    databaseUrl: localConfig.databaseUrl,
    logLevel: localConfig.logLevel,
  },
  staging: {
    databaseUrl: stagingConfig.databaseUrl,
    logLevel: stagingConfig.logLevel,
  },
  production: {
    databaseUrl: productionConfig.databaseUrl,
    logLevel: productionConfig.logLevel,
  },
});
