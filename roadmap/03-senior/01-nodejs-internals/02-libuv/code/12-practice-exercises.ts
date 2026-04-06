import { logger } from "./shared/logger.js";

logger.info("Practice exercises", {
  exercises: [
    "Add a comparison between parallel and serialized crypto tasks.",
    "Simulate background file processing competing with request driven lookups.",
    "Measure how increasing task count changes total batch time.",
    "Add a report that explains which operations likely use the worker pool and which do not.",
    "Add a worker thread comparison for CPU work vs libuv based async work.",
  ],
});
