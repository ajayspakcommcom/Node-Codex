import { createLogger } from "./shared/logger.js";

const logger = createLogger("timers-basics");

logger.info("Scheduling timers", {
  note: "Timers are best-effort scheduling, not exact-time guarantees",
});

setTimeout(() => {
  logger.info("setTimeout callback executed");
}, 20);

const interval = setInterval(() => {
  logger.info("setInterval callback executed once");
  clearInterval(interval);
}, 30);
