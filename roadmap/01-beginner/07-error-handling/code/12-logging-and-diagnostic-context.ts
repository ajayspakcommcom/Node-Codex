import { createLogger } from "./shared/logger.js";
import { BusinessRuleError } from "./shared/errors.js";

const logger = createLogger("diagnostic-context");

const error = new BusinessRuleError("Insufficient balance");

logger.error("Request failed with domain context", {
  requestId: "req_1001",
  route: "/checkout",
  actorId: "usr_200",
  operation: "process-checkout",
  errorName: error.name,
  code: error.code,
});
