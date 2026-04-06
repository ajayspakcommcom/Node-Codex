import { createLogger } from "./shared/logger";

const logger = createLogger("retry-storm");

logger.info("bad_pattern", {
  pattern: "client retries + API retries + service retries + consumer retries",
  issue: "Layered retries can multiply load during outages.",
});

logger.info("better_pattern", {
  pattern: "single clear retry owner with bounded attempts and backoff",
  issue: "Keeps recovery logic explicit and prevents overload amplification.",
});
