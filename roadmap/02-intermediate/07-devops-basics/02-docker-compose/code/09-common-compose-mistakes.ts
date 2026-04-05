import { logger } from "./shared/logger.js";

logger.warn("Common Docker Compose mistakes", {
  mistakes: [
    "assuming depends_on means the dependency is fully ready",
    "keeping secrets directly in the Compose file",
    "letting service configuration drift across app and worker processes",
    "persisting data accidentally between local test runs",
    "using Compose as if it were the production orchestration model",
  ],
});
