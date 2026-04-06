import { createLogger } from "./shared/logger";

const logger = createLogger("bad-fallback");

logger.info("bad_pattern", {
  fallback: "return payment success even when payment gateway is down",
  issue: "This hides a real failure and creates data corruption risk.",
});

logger.info("better_pattern", {
  fallback: "return degraded response or explicit failure state",
  issue: "Makes system behavior honest and operationally safe.",
});
