import { createLogger } from "./shared/logger";

const logger = createLogger("coordination");

logger.info("idempotency_coordination", {
  rule: "Retrying write operations requires idempotent behavior.",
});

logger.info("breaker_coordination", {
  rule: "Circuit breakers should stop retries from repeatedly hitting a known unhealthy dependency.",
});
