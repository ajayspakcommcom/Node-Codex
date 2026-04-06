import { createLogger } from "./shared/logger";

const logger = createLogger("timeout-purpose");

logger.info("explicit_timeout_required", {
  reason: "Without explicit timeouts, hung dependencies can consume request budget indefinitely.",
  example: "inventory-service waiting forever on external shipping API",
});
