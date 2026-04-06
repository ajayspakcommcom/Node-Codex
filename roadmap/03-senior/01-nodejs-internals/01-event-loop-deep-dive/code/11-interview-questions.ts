import { logger } from "./shared/logger.js";

logger.info("Interview questions", {
  questions: [
    "Why can heavy microtask usage affect timer behavior?",
    "How does blocking the event loop change latency for unrelated requests?",
    "Why is event loop lag useful as a production metric?",
    "What makes process.nextTick more dangerous than it first appears?",
    "When would cooperative yielding be preferable to a single long loop?",
  ],
});
