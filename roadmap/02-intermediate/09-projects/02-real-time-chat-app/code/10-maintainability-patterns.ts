import { logger } from "./shared/logger.js";

logger.info("Maintainability patterns", {
  rules: [
    "keep gateway transport concerns separate from room and message policies",
    "persist chat history through dedicated message services instead of direct socket handlers",
    "enforce room and tenant boundaries before message fan out",
    "treat moderation as policy logic rather than UI behavior",
    "define reconnect and stale presence cleanup rules explicitly",
    "prepare for cross instance fan out before traffic grows",
  ],
});
