import { createLogger } from "./shared/logger.js";

const logger = createLogger("config-debugging");

function loadPortFromEnv(env: NodeJS.ProcessEnv): number {
  const rawValue = env.PORT ?? "3000";
  const port = Number(rawValue);

  if (!Number.isInteger(port) || port <= 0) {
    throw new Error(`Invalid PORT value: ${rawValue}`);
  }

  return port;
}

try {
  const port = loadPortFromEnv({ PORT: "not-a-number" });
  logger.info("Loaded port", { port });
} catch (error: unknown) {
  if (error instanceof Error) {
    logger.error("Configuration debugging example", {
      message: error.message,
      suspectedSurface: "environment configuration",
    });
  }
}
