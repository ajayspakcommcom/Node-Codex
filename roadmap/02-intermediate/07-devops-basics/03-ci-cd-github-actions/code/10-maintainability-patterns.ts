import { logger } from "./shared/logger.js";
import { validationWorkflow } from "./shared/cicd-runtime.js";
import { renderWorkflow } from "./module/workflow/workflow-renderer.js";

logger.info("CI/CD maintainability patterns", {
  workflow: validationWorkflow.name,
  patterns: [
    "split validation into readable stages",
    "keep artifact-producing work explicit",
    "separate deploy jobs from pull-request validation jobs",
    "make triggers, needs, and environments easy to review",
  ],
  yamlPreview: renderWorkflow(validationWorkflow),
});
