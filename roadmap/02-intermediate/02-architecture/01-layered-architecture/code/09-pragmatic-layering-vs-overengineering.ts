import { logger } from "./shared/logger.js";

logger.warn("Overengineering warning", {
  badPattern:
    "Creating extra layers, wrappers, and interfaces for every small file can make simple changes slower without adding clarity.",
});

logger.info("Pragmatic layering", {
  guidance:
    "Start with controller, service, repository, and infrastructure boundaries where they solve real coupling problems. Increase abstraction only when complexity justifies it.",
});
