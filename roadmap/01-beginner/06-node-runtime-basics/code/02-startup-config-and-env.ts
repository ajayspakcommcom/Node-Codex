import { loadAppConfigFromEnv } from "./shared/config.js";
import { createLogger } from "./shared/logger.js";

const logger = createLogger("startup-config");

function main(): void {
  const config = loadAppConfigFromEnv(process.env);

  logger.info("Loaded startup configuration", config);
  logger.info("Runtime environment access is centralized", {
    serviceName: config.serviceName,
    environment: config.environment,
  });
}

main();
