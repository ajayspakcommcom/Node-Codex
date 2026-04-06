import { logger } from "./shared/logger.js";

logger.info("Practice exercises", {
  exercises: [
    "Add a bounded cache comparison and explain the retention difference.",
    "Simulate interval driven object retention and show how cleanup changes the assessment.",
    "Add a fake heap report that correlates gc pressure with retained reference counts.",
    "Add a listener cleanup lifecycle example.",
    "Build a small investigation checklist from symptom to snapshot to fix.",
  ],
});
