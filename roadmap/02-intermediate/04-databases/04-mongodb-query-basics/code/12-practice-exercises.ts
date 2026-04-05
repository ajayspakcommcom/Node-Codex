import { logger } from "./shared/logger.js";

const practiceExercises = [
  "Add a repository method that filters orders by region and returns only the fields needed for an export preview.",
  "Create a validator rule that rejects unsupported filter keys instead of silently ignoring them.",
  "Add an example that updates nested shipping state with `$set` and increments a retry counter with `$inc`.",
  "Model a cursor-style pagination alternative and explain when it is better than skip-based paging.",
  "Create tests that compare a full-document response against a projected response and assert the projected shape is smaller.",
];

logger.info("MongoDB query basics practice exercises", {
  practiceExercises,
});
