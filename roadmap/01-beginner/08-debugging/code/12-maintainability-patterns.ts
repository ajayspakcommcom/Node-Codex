import { createLogger } from "./shared/logger.js";
import { buildRequestContext } from "./shared/request-context.js";

const logger = createLogger("maintainability-patterns");

function handleRequest(): void {
  const context = buildRequestContext("req_debug_1", "/reports/export", "usr_77");

  logger.info("Request started", {
    ...context,
    operation: "start-export",
  });

  logger.info("Request completed", {
    ...context,
    operation: "finish-export",
    result: "success",
  });
}

handleRequest();
