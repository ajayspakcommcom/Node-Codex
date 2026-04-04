import { createLogger } from "./shared/logger.js";

const logger = createLogger("lifecycle");

let isShuttingDown = false;

function startService(): void {
  logger.info("Service startup phase");
  logger.info("Service ready phase");
}

function gracefulShutdown(signal: string): void {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;
  logger.info("Shutdown initiated", { signal });

  setTimeout(() => {
    logger.info("Shutdown cleanup complete");
  }, 10);
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

startService();
gracefulShutdown("demo-signal");
