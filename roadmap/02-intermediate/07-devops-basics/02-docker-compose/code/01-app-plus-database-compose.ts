import { logger } from "./shared/logger.js";
import { appDatabaseSpec } from "./shared/compose-runtime.js";
import { renderCompose } from "./module/compose/compose-renderer.js";

logger.info("App plus database Compose example", {
  project: appDatabaseSpec.projectName,
  compose: renderCompose(appDatabaseSpec),
});
