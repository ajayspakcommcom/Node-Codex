import { logger } from "./shared/logger.js";

const practiceExercises = [
  "Add a query example where a single-column index is not enough because sorting is still expensive.",
  "Model a composite index that supports one query well but another similar query poorly because of column order.",
  "Add an overlap checker for redundant indexes on the same table.",
  "Introduce a low-selectivity status column example and explain when it still might be useful in a composite index.",
  "Create tests that compare plan summaries before and after adding an index for a critical endpoint.",
];

logger.info("Indexing strategies practice exercises", {
  practiceExercises,
});
