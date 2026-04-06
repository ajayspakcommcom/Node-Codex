import { logger } from "./shared/logger.js";

logger.info("Cross boundary pressure propagation", {
  flow: [
    "incoming API burst",
    "bounded in process queue fills",
    "downstream queue begins rejecting work",
    "retry policy increases pressure",
    "latency sensitive work degrades",
  ],
  takeaway: "backpressure must be reasoned about across the whole path, not at one boundary only.",
});
