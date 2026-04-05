import { logger } from "./shared/logger.js";

logger.info("Practice exercises for test databases", {
  exercises: [
    "Add a customer collection and seed relationally meaningful fixture data.",
    "Extend the harness with unique-key validation and write a test that catches duplicate seeds.",
    "Add a per-suite cleanup hook that chooses reset or rollback based on the scenario.",
    "Model a container-startup step and verify schema initialization happens automatically.",
    "Create a flaky shared-state example and then refactor it into isolated harnesses.",
  ],
});
