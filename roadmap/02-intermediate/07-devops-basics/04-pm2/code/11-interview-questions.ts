import { logger } from "./shared/logger.js";

logger.info("PM2 interview prompts", {
  questions: [
    "What problems does PM2 solve in a server-based Node.js deployment?",
    "Why can restart loops create false confidence?",
    "What risks appear when PM2 cluster mode is enabled?",
    "How should PM2 config differ between development and production-like environments?",
    "When is PM2 a good fit and when is it not the right operational model?",
  ],
});
