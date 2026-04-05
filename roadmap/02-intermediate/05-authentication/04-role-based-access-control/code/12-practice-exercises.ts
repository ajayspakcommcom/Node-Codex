import { logger } from "./shared/logger.js";

const practiceExercises = [
  "Add a finance role with a narrow refund permission set and compare it to the broader manager role.",
  "Create a background-job example that reuses service-layer authorization without going through an HTTP route.",
  "Add a tenant-admin role and prove it cannot act on another tenant's resources.",
  "Model a resource-state rule where refunds are only allowed for placed orders that have not already been refunded.",
  "Create tests that prove a direct role-name check is less maintainable than permission-based policy evaluation.",
];

logger.info("RBAC practice exercises", {
  practiceExercises,
});
