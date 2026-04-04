import { createLogger } from "./shared/logger.js";
import { setFailureExitCode } from "./shared/runtime.js";

const logger = createLogger("uncaught-errors");

process.on("uncaughtException", (error) => {
  logger.error("Caught uncaughtException handler", { message: error.message });
  setFailureExitCode();
});

process.on("unhandledRejection", (reason) => {
  logger.error("Caught unhandledRejection handler", { reason });
  setFailureExitCode();
});

function main(): void {
  logger.info("Registered process-level error handlers", {
    note: "Handlers should exist for diagnosis, not to hide unstable process state",
  });
}

main();
