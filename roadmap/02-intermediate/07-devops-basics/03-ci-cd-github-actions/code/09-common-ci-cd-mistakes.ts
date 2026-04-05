import { logger } from "./shared/logger.js";

logger.warn("Common CI/CD mistakes", {
  mistakes: [
    "mixing validation and deployment concerns into one opaque job",
    "keeping no explicit quality gates for lint, test, or build",
    "letting secrets appear in workflow commands or logs",
    "using wildcard triggers without understanding the blast radius",
    "creating pipelines so slow or flaky that engineers stop trusting them",
  ],
});
