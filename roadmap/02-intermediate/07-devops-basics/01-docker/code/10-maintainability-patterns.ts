import { logger } from "./shared/logger.js";
import { enterpriseApiSpec } from "./shared/docker-runtime.js";
import { renderDockerfile } from "./module/build/dockerfile-renderer.js";

logger.info("Maintainability patterns", {
  project: enterpriseApiSpec.projectName,
  patterns: [
    "use a clear build stage and runtime stage split",
    "keep copy and install steps intentional for caching",
    "keep `.dockerignore` aligned with large or sensitive paths",
    "make runtime command and env assumptions explicit",
  ],
  dockerfilePreview: renderDockerfile(enterpriseApiSpec),
});
