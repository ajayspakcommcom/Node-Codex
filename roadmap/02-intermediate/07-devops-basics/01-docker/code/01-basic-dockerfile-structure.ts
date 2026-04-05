import { logger } from "./shared/logger.js";
import { enterpriseApiSpec } from "./shared/docker-runtime.js";
import { renderDockerfile } from "./module/build/dockerfile-renderer.js";

logger.info("Basic Dockerfile structure", {
  project: enterpriseApiSpec.projectName,
  dockerfile: renderDockerfile(enterpriseApiSpec),
});
