import { logger } from "./shared/logger.js";
import { validationWorkflow } from "./shared/cicd-runtime.js";

logger.info("Local and CI alignment", {
  workflow: validationWorkflow.name,
  principles: [
    "Prefer the same install command locally and in CI.",
    "Run the same lint and test entry points in local development and pipeline jobs.",
    "Keep pipeline stages readable enough that developers can reproduce failures locally.",
  ],
});
