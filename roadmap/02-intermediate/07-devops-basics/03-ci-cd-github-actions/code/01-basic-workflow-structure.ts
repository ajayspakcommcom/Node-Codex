import { logger } from "./shared/logger.js";
import { validationWorkflow } from "./shared/cicd-runtime.js";
import { renderWorkflow } from "./module/workflow/workflow-renderer.js";

logger.info("Basic GitHub Actions workflow structure", {
  workflow: validationWorkflow.name,
  yamlPreview: renderWorkflow(validationWorkflow),
});
