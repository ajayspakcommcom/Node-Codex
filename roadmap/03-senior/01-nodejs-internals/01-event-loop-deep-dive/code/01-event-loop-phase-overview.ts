import { logger } from "./shared/logger.js";

logger.info("Event loop phase overview", {
  phases: [
    "timers",
    "pending callbacks",
    "idle/prepare",
    "poll",
    "check",
    "close callbacks",
  ],
  productionFocus: [
    "timer drift",
    "i/o callback timing",
    "setImmediate behavior",
    "event loop lag under load",
  ],
});
