import { createLogger } from "./shared/logger.js";
import { buildRequestContext } from "./shared/request-context.js";

const logger = createLogger("request-correlation");
const context = buildRequestContext("req_corr_1", "/checkout", "usr_500");

function serviceLayer(): void {
  logger.info("Service layer reached", {
    ...context,
    operation: "service-layer",
  });
}

function repositoryLayer(): void {
  logger.info("Repository layer reached", {
    ...context,
    operation: "repository-layer",
  });
}

serviceLayer();
repositoryLayer();
