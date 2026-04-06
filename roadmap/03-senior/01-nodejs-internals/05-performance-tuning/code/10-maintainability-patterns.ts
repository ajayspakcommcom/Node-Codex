import { logger } from "./shared/logger.js";

logger.info("Maintainability patterns", {
  rules: [
    "define the target metric before tuning",
    "keep before and after benchmark context visible",
    "treat p95 and p99 as first class signals",
    "prefer reversible optimizations with clear evidence",
    "document the tradeoff behind every tuning decision",
  ],
});
