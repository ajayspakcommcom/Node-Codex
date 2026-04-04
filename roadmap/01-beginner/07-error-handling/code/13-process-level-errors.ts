import { createLogger } from "./shared/logger.js";
import { setFailureExitCode } from "./shared/runtime.js";

const logger = createLogger("process-level-errors");

process.on("uncaughtException", (error) => {
  logger.error("uncaughtException observed", {
    errorName: error.name,
    message: error.message,
  });
  setFailureExitCode();
});

process.on("unhandledRejection", (reason) => {
  logger.error("unhandledRejection observed", {
    reason,
  });
  setFailureExitCode();
});

logger.info("Process-level error handlers registered", {
  note: "These handlers support diagnosis; they do not make corrupted process state safe",
});
