import { logger } from "./shared/logger.js";

const practiceExercises = [
  "Add a repository method that uses the ORM-style repository for a refund workflow and compare it with a builder-style reporting query on the same dataset.",
  "Create an example where a builder query is clearer than an ORM relation traversal for a grouped dashboard read.",
  "Add a fake repository implementation to demonstrate how service tests avoid depending on ORM entities.",
  "Model a migration scenario where a new column is introduced gradually and compare how each abstraction handles it.",
  "Create tests that assert the mixed-approach architecture keeps ORM and builder details out of the service boundary.",
];

logger.info("ORMs vs query builders practice exercises", {
  practiceExercises,
});
