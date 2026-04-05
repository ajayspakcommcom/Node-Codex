import { logger } from "./shared/logger.js";

logger.info("Practice exercises for Docker", {
  exercises: [
    "Add a non-root user step to the enterprise example and explain the runtime impact.",
    "Refactor the risky example into a multi-stage build with pinned dependencies.",
    "Extend the `.dockerignore` example for a monorepo-style workspace.",
    "Model a CI build step that should fail when the image uses `latest`.",
    "Create a comparison between development-only tools in the build stage and runtime image contents.",
  ],
});
