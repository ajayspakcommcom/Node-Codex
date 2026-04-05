import { logger } from "./shared/logger.js";
import { appRedisWorkerSpec } from "./shared/compose-runtime.js";

logger.info("Worker-service Compose awareness", {
  workerService: appRedisWorkerSpec.services.find((service) => service.name === "worker"),
  rule: "Treat workers as explicit services with their own command, env, and dependency model.",
});
