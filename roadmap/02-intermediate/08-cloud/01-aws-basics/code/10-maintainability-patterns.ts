import { logger } from "./shared/logger.js";

logger.info("Cloud maintainability patterns", {
  patterns: [
    "make service responsibilities easy to explain",
    "keep IAM and network boundaries explicit",
    "surface cost and scaling assumptions early",
    "pair managed services with operational visibility",
  ],
});
