import { logger } from "./shared/logger.js";

logger.info("Unit testing with Jest interview prompts", {
  questions: [
    "What belongs in a unit test versus an integration test?",
    "Why is injecting a clock useful in business-rule tests?",
    "When is a fake repository better than a detailed mock?",
    "How do you keep unit tests stable during refactors?",
    "What risks come from over-mocking external dependencies?",
  ],
});
