import { logger } from "./shared/logger.js";

logger.info("Environment config interview prompts", {
  questions: [
    "Why should deployment-specific values stay outside the codebase?",
    "What should be validated at startup and why?",
    "How do you reduce configuration drift across environments?",
    "Why are secrets different from ordinary config values?",
    "What risks come from treating local defaults as production-ready settings?",
  ],
});
