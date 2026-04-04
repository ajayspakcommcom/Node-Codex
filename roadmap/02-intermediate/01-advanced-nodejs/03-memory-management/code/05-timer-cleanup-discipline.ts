import { logger } from "./shared/logger.js";

const intervalId = setInterval(() => {
  logger.info("Background timer tick", {
    note: "Intervals should be cleared when the owning workflow ends.",
  });
}, 100);

setTimeout(() => {
  clearInterval(intervalId);
  logger.info("Timer cleaned up", {
    guidance: "Timers and intervals should not outlive the feature or request context that created them.",
  });
}, 250);
