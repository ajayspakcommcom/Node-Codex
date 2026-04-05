import { logger } from "./shared/logger.js";

logger.info("Docker interview prompts", {
  questions: [
    "Why does Docker layer order affect build performance?",
    "What is the value of a multi-stage Docker build?",
    "Why should secrets usually not be baked into an image?",
    "How does `.dockerignore` improve both security and build speed?",
    "What problems come from using `latest` in important builds?",
  ],
});
