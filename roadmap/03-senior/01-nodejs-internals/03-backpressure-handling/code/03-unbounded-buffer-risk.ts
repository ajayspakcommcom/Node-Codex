import { logger } from "./shared/logger.js";

logger.warn("Unbounded buffer risk", {
  risk: [
    "memory growth becomes the hidden overload policy",
    "latency grows silently as work accumulates",
    "operators lose the moment where controlled rejection should have happened",
  ],
});
