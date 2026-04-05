import { logger } from "./shared/logger.js";

logger.info("Practice exercises for environment-based configs", {
  exercises: [
    "Add a feature-flag field and explain which environments should enable it.",
    "Extend startup validation to fail when a staging config uses local endpoints.",
    "Refactor the risky config so secrets move to managed environment injection.",
    "Design a config comparison checklist for local, staging, and production deployments.",
    "Create a config schema for a worker service that differs safely from the API service.",
  ],
});
