import { logger } from "./shared/logger.js";

logger.info("Managed service vs self-managed thinking", {
  managedServiceBenefits: [
    "less infrastructure administration",
    "faster provisioning",
    "clearer responsibility boundaries for some layers",
  ],
  remainingTeamResponsibilities: [
    "application security",
    "access control",
    "data design",
    "cost and runtime behavior review",
  ],
});
