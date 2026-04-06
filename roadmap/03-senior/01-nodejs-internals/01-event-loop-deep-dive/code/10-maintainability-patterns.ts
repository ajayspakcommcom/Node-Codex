import { logger } from "./shared/logger.js";

logger.info("Maintainability patterns", {
  rules: [
    "keep blocking work measurable and isolated",
    "use event loop lag as an operational signal",
    "prefer evidence over intuition when debugging latency",
    "document scheduling assumptions in critical paths",
    "yield cooperatively when long in process work cannot be avoided",
  ],
});
