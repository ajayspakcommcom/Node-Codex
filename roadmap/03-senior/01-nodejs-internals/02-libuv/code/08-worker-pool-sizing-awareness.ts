import { logger } from "./shared/logger.js";

logger.info("Worker pool sizing awareness", {
  points: [
    "the libuv thread pool is shared across qualifying operations",
    "increasing pool size changes contention patterns but is not a free optimization",
    "pool tuning should follow measurement, not guesswork",
    "runtime tuning does not replace workload isolation or architecture improvements",
  ],
});
