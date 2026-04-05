import { logger } from "./shared/logger.js";

const practiceExercises = [
  "Add a pipeline that groups tenant revenue by region and compares the cost before and after an early projection stage.",
  "Create a lookup example that joins customers into orders, then explain whether the join should happen before or after grouping.",
  "Model a pipeline whose unwind stage doubles the row count and identify that stage as the hot spot.",
  "Add a materialization advisor rule for dashboards that are requested every minute but allow fifteen-minute staleness.",
  "Create tests that assert the optimized pipeline costs less than the late-filter anti-pattern for the same business result.",
];

logger.info("Aggregation pipelines practice exercises", {
  practiceExercises,
});
