import { createLogger } from "./shared/logger";

const logger = createLogger("sync-vs-async");

logger.info("synchronous_retry_policy", {
  useCase: "customer-facing API request",
  strategy: "few fast retries within latency budget",
});

logger.info("asynchronous_retry_policy", {
  useCase: "background consumer",
  strategy: "more retries with backoff and dead-letter handling",
});
