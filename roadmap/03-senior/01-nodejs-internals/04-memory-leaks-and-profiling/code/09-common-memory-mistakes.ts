import { logger } from "./shared/logger.js";

logger.warn("Common memory mistakes", {
  mistakes: [
    "using unbounded caches",
    "retaining request data beyond request lifetime",
    "adding listeners without lifecycle cleanup",
    "assuming every heap increase is a leak",
    "restarting processes instead of fixing retention causes",
  ],
});
