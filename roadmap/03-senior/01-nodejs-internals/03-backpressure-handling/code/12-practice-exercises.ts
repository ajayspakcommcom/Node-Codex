import { logger } from "./shared/logger.js";

logger.info("Practice exercises", {
  exercises: [
    "Add priority queues for critical vs best effort work.",
    "Add per consumer rate limits to the socket delivery model.",
    "Simulate a queue draining slower than arrival and expose a rejection threshold.",
    "Add an alert rule that triggers when queue depth stays high for too long.",
    "Add a stale while revalidate style API example and explain the backpressure tradeoff.",
  ],
});
