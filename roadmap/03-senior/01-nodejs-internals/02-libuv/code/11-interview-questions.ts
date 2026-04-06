import { logger } from "./shared/logger.js";

logger.info("Interview questions", {
  questions: [
    "Why can asynchronous filesystem or crypto work still create contention in Node?",
    "What types of work commonly use the libuv thread pool?",
    "Why is thread pool saturation a latency problem for unrelated requests?",
    "How is async runtime delegation different from synchronous CPU execution on the main thread?",
    "Why should worker pool tuning follow profiling instead of intuition?",
  ],
});
