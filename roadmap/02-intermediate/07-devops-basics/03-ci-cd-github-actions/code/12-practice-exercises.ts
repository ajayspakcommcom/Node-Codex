import { logger } from "./shared/logger.js";

logger.info("Practice exercises for CI/CD with GitHub Actions", {
  exercises: [
    "Add a staging deployment job that depends on the validation workflow but remains separate from production.",
    "Refactor the risky workflow into explicit lint, test, build, and deploy jobs.",
    "Add an artifact upload step and explain when it should be consumed downstream.",
    "Model a branch strategy where only tagged releases can trigger production deployment.",
    "Add a secret-handling review step that flags risky echo or inline token usage.",
  ],
});
