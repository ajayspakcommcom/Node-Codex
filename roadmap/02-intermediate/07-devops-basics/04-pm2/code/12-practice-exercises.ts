import { logger } from "./shared/logger.js";

logger.info("Practice exercises for PM2", {
  exercises: [
    "Refactor the risky spec so secrets move out of the ecosystem config.",
    "Add a worker process entry and explain whether fork or cluster mode is a better fit.",
    "Model a logging strategy with separate files for stdout and stderr.",
    "Create a staging environment block and compare it with production settings.",
    "Write a checklist for deciding whether PM2 or container orchestration is the better fit for a deployment.",
  ],
});
