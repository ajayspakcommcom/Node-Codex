import { logger } from "./shared/logger.js";

logger.info("Practice exercises for Docker Compose", {
  exercises: [
    "Add a queue broker service and model how the app and worker depend on it.",
    "Refactor the risky spec to remove hardcoded secrets and localhost assumptions.",
    "Create a reset strategy note for named volumes during local integration testing.",
    "Add a dedicated test profile for a shorter-lived local test stack.",
    "Model a health-aware startup approach for a service that depends on MongoDB readiness.",
  ],
});
