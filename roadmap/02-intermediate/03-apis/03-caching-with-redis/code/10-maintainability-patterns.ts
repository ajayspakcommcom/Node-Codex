import { logger } from "./shared/logger.js";

const maintainabilityPatterns = [
  "Keep Redis access behind clear cache boundaries instead of calling the client from unrelated modules.",
  "Define TTL and invalidation policy together for each cached resource.",
  "Design cache keys with tenant and version context explicitly.",
  "Treat fallback behavior during Redis outages as a conscious policy decision.",
  "Measure hit rate and stale-data impact before expanding cache usage broadly.",
];

logger.info("Maintainability patterns for Redis caching", {
  maintainabilityPatterns,
  guidance: "Enterprise caching stays maintainable when key design, invalidation, and fallback behavior remain explicit rather than hidden inside ad hoc helper calls.",
});
