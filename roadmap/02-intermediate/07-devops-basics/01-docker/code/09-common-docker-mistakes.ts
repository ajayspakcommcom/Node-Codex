import { logger } from "./shared/logger.js";

logger.warn("Common Docker mistakes", {
  mistakes: [
    "copying the entire repository too early and invalidating cache layers",
    "using `latest` tags and unpinned installs for critical builds",
    "baking secrets directly into image environment variables",
    "keeping build tooling in the runtime image without reason",
    "treating Docker as a substitute for clear runtime documentation",
  ],
});
