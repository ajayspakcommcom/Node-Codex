import { logger } from "./shared/logger.js";

logger.info("Maintainability patterns", {
  rules: [
    "bound long lived collections intentionally",
    "document eviction and cleanup ownership",
    "use profiling evidence before changing architecture",
    "review listener and cache code for retention risk",
    "treat gc pressure as an early warning signal",
  ],
});
