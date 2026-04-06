import { logger } from "./shared/logger.js";

logger.warn("Common backpressure mistakes", {
  mistakes: [
    "using unbounded in memory queues",
    "ignoring slow consumer behavior in sockets",
    "accepting work without a clear overload policy",
    "treating queue growth as harmless",
    "retrying aggressively into already saturated systems",
  ],
});
