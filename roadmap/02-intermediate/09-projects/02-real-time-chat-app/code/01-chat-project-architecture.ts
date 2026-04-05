import { logger } from "./shared/logger.js";

logger.info("Chat project architecture", {
  layers: ["gateway", "auth service", "room service", "message service", "moderation service", "repositories", "broker"],
  workflows: [
    "authenticate socket",
    "join room",
    "send message",
    "persist history",
    "moderate room",
    "clean up stale presence",
    "coordinate across instances",
  ],
  enterpriseFocus: ["room isolation", "tenant boundaries", "delivery awareness", "cross instance fan-out", "operational safety"],
});
