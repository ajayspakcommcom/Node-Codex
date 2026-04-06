import { logger } from "./shared/logger.js";

logger.info("Maintainability patterns", {
  rules: [
    "keep runtime heavy operations visible in code review",
    "separate latency sensitive and background workloads where possible",
    "profile contention before changing pool related settings",
    "document runtime assumptions behind expensive async paths",
    "explain bottlenecks in terms of actual shared resources",
  ],
});
