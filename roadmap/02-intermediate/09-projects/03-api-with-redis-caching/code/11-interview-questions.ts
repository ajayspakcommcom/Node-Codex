import { logger } from "./shared/logger.js";

logger.info("Interview questions", {
  questions: [
    "Why is cache aside a common choice for APIs?",
    "Why should cache keys include tenant or version scope when needed?",
    "What problem does cache stampede protection solve?",
    "How should an API behave if redis is unavailable during reads or invalidation?",
    "Why is write path invalidation just as important as read path caching?",
  ],
});
