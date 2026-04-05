import { logger } from "./shared/logger.js";

const practiceExercises = [
  "Add a sliding-window approximation to the current limiter service.",
  "Introduce a tenant-specific policy override for a premium enterprise account.",
  "Add structured logs for every blocked request including policy, key, and retry-after data.",
  "Model a separate password-reset policy with stricter fail-closed behavior.",
  "Add tests proving two application instances share counters through the Redis-like store.",
];

logger.info("Rate-limiting practice exercises", {
  practiceExercises,
});
