import { logger } from "./shared/logger.js";

const practiceExercises = [
  "Add a v3 order response that introduces tax breakdown while keeping the service layer unchanged.",
  "Extend the controller so unsupported versions return a 400-style response contract instead of throwing.",
  "Add version usage logging by endpoint and consumer team.",
  "Create tests that prove v1 stays stable while v2 evolves.",
  "Model a migration plan for removing v1 after usage drops below an agreed threshold.",
];

logger.info("API versioning practice exercises", {
  practiceExercises,
});
