import { logger } from "./shared/logger.js";
import { appDatabaseSpec } from "./shared/compose-runtime.js";
import { renderCompose } from "./module/compose/compose-renderer.js";

logger.info("Compose maintainability patterns", {
  project: appDatabaseSpec.projectName,
  patterns: [
    "keep each service focused and named by responsibility",
    "centralize local dependency setup in one readable stack file",
    "use explicit networks and named volumes for clarity",
    "keep environment configuration consistent across related services",
  ],
  composePreview: renderCompose(appDatabaseSpec),
});
