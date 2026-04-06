import { createLogger } from "./shared/logger";

const logger = createLogger("breaker-purpose");

logger.info("problem", {
  dependency: "payment-gateway",
  issue: "Repeated slow failures can consume request budget and connection capacity.",
});

logger.info("solution", {
  pattern: "circuit_breaker",
  effect: "Fail fast when dependency health is already known to be poor.",
});
