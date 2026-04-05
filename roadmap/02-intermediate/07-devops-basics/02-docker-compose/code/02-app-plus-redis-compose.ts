import { logger } from "./shared/logger.js";
import { appRedisWorkerSpec } from "./shared/compose-runtime.js";
import { renderCompose } from "./module/compose/compose-renderer.js";

logger.info("App plus Redis Compose example", {
  project: appRedisWorkerSpec.projectName,
  compose: renderCompose(appRedisWorkerSpec),
});
