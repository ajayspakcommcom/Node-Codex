import { logger } from "./shared/logger.js";

logger.info("Test database interview prompts", {
  questions: [
    "When is an in-memory substitute not enough for persistence tests?",
    "How do reset and truncate strategies differ in test setup?",
    "Why is rollback-based isolation useful for database-backed tests?",
    "How do you keep seeded fixtures readable and realistic at the same time?",
    "Why should schema setup be part of automated test initialization?",
  ],
});
