import { logger } from "./shared/logger.js";

logger.info("AWS basics interview prompts", {
  questions: [
    "What does the shared responsibility model mean in practice?",
    "Why do region and availability choices matter architecturally?",
    "How do IAM boundaries affect cloud safety?",
    "Why should cost and scaling be considered before traffic grows?",
    "How do you choose managed services intentionally instead of by habit?",
  ],
});
