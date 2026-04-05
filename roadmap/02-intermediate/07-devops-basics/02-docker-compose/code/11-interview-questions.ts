import { logger } from "./shared/logger.js";

logger.info("Docker Compose interview prompts", {
  questions: [
    "What problems does Docker Compose solve for backend teams locally?",
    "Why does depends_on not fully solve service readiness?",
    "How do named volumes affect local persistence and test resets?",
    "Why should environment variables stay coordinated across app and worker services?",
    "When is Compose a good fit, and when is it not the right operational tool?",
  ],
});
