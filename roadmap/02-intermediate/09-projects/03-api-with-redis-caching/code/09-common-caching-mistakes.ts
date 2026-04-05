import { logger } from "./shared/logger.js";

logger.warn("Common caching mistakes", {
  mistakes: [
    "caching without invalidation rules",
    "using weak cache keys that ignore tenant scope",
    "assuming stale catalog data is always harmless",
    "failing hard when redis is temporarily unavailable",
    "not measuring hit, miss, and fallback behavior",
    "adding caching directly inside controllers without clear ownership",
  ],
});
