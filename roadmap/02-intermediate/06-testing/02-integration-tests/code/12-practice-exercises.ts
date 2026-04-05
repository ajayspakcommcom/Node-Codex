import { logger } from "./shared/logger.js";

logger.info("Practice exercises for integration tests", {
  exercises: [
    "Add an update-order endpoint and integration-test its validation and authorization flow.",
    "Extend Application with tenant-specific reads and verify cross-tenant isolation.",
    "Add a payment_pending transition and test the transaction workflow around it.",
    "Introduce a repository mapping bug intentionally and write an integration test that catches it.",
    "Add a controlled email notifier boundary and verify no notification is emitted on failed transactions.",
  ],
});
