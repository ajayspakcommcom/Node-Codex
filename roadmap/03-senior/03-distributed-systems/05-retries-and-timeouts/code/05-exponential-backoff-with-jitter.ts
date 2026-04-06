import { createLogger } from "./shared/logger";
import { computeBackoffDelay } from "./shared/retry";

const logger = createLogger("backoff");

for (let attempt = 1; attempt <= 4; attempt += 1) {
  logger.info("backoff_delay", {
    attempt,
    delayMs: computeBackoffDelay(attempt, 100),
  });
}
