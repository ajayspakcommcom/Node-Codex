import { logger } from "./shared/logger.js";

logger.info("Integration testing interview prompts", {
  questions: [
    "How do integration tests differ from unit tests and end-to-end tests?",
    "What makes a good integration boundary for a backend workflow?",
    "Why should most CI integration tests avoid live third-party systems?",
    "How do you keep seeded test data stable across repeated runs?",
    "When should a transaction workflow be verified at the integration level?",
  ],
});
