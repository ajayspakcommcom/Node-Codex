import { logger } from "./shared/logger.js";

const practiceExercises = [
  "Add stale-while-revalidate behavior for one catalog endpoint while keeping invalidation understandable.",
  "Introduce tenant-specific TTL overrides for premium and standard plans.",
  "Add metrics for cache hit rate by key family and by tenant.",
  "Model a cache stampede lock with timeout protection for a hot product key.",
  "Add tests proving cache invalidation happens after product price updates.",
];

logger.info("Redis caching practice exercises", {
  practiceExercises,
});
