import { logger } from "./shared/logger.js";

logger.info("Mocking interview prompts", {
  questions: [
    "When should you use a fake instead of a mock?",
    "Why is over-mocking dangerous in business-rule tests?",
    "What is contract drift and how do you reduce it?",
    "Which boundaries are good candidates for mocks in a backend service?",
    "How do spies differ from stubs and when are they useful?",
  ],
});
