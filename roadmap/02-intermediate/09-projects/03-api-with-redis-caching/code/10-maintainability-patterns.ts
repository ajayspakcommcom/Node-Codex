import { logger } from "./shared/logger.js";

logger.info("Maintainability patterns", {
  rules: [
    "keep cache key construction centralized",
    "separate repository and cache responsibilities",
    "treat write paths as invalidation events",
    "define fallback behavior for redis failure explicitly",
    "measure cache effectiveness continuously",
    "keep tenant scope visible in every cache boundary",
  ],
});
