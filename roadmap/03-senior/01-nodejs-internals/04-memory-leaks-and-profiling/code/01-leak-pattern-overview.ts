import { logger } from "./shared/logger.js";

logger.info("Leak pattern overview", {
  commonPatterns: [
    "unbounded caches",
    "listener buildup",
    "request scoped data retained beyond request lifetime",
    "closures holding long lived references",
    "background structures that never shrink",
  ],
});
