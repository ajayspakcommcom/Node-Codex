import { logger } from "./shared/logger.js";

const maintainabilityPatterns = [
  "Define the business invariant before defining the transaction boundary.",
  "Keep transactions short and limited to the database work that must commit together.",
  "Open the transaction at the service workflow boundary instead of scattering BEGIN and COMMIT across helpers.",
  "Avoid external HTTP calls, queue publishing, and email sending inside the transaction.",
  "Document retry behavior for deadlocks and other transient failures.",
  "Use an outbox or post-commit handoff when reliable async delivery is required.",
];

logger.info("Maintainability patterns for transactions", {
  maintainabilityPatterns,
  guidance: "Enterprise transaction code stays maintainable when atomicity, retries, and side-effect boundaries remain explicit.",
});
