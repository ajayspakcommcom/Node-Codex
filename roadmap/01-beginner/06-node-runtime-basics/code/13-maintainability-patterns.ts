import { loadAppConfigFromEnv } from "./shared/config.js";
import { createLogger } from "./shared/logger.js";

interface ServiceRuntimeContext {
  readonly config: ReturnType<typeof loadAppConfigFromEnv>;
  readonly logger: ReturnType<typeof createLogger>;
}

function createRuntimeContext(): ServiceRuntimeContext {
  const config = loadAppConfigFromEnv(process.env);
  const logger = createLogger(config.serviceName);

  return {
    config,
    logger,
  };
}

const context = createRuntimeContext();

context.logger.info("Runtime context created with centralized config", {
  environment: context.config.environment,
  port: context.config.port,
});
