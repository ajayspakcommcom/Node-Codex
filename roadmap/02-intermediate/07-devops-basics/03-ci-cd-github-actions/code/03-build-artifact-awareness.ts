import { logger } from "./shared/logger.js";
import { deploymentWorkflow, riskyWorkflow, validationWorkflow } from "./shared/cicd-runtime.js";

logger.info("Build artifact awareness", {
  validationProducesArtifacts: validationWorkflow.producesArtifacts,
  deploymentProducesArtifacts: deploymentWorkflow.producesArtifacts,
  riskyProducesArtifacts: riskyWorkflow.producesArtifacts,
  rule: "Where packaging matters, the pipeline should prove the build artifact is valid before deployment.",
});
