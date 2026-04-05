import { logger } from "./shared/logger.js";

const practiceExercises = [
  "Add a workflow where a transfer between two accounts rolls back because the destination account is missing.",
  "Model a transaction that deadlocks twice before succeeding, then compare the retry metrics.",
  "Extend the boundary advisor with a warning for user-input steps that should never keep a transaction open.",
  "Add an example showing why a payment gateway call should happen before or after the database transaction depending on the workflow design.",
  "Create tests that assert no order row or outbox event remains after a failed inventory reservation.",
];

logger.info("Transactions practice exercises", {
  practiceExercises,
});
