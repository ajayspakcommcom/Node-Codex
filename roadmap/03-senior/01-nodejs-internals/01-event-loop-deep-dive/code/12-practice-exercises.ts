import { logger } from "./shared/logger.js";

logger.info("Practice exercises", {
  exercises: [
    "Add an i/o callback example and compare it with timers and setImmediate.",
    "Build a small event loop lag sampler that reports p95 lag over many samples.",
    "Simulate a queue consumer that yields every N messages and compare fairness.",
    "Add a worker thread comparison for CPU heavy work vs main thread blocking.",
    "Add a request path example that combines JSON parsing, validation, and timer drift.",
  ],
});
