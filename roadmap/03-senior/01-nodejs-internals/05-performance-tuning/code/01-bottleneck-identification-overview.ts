import { logger } from "./shared/logger.js";

logger.info("Bottleneck identification overview", {
  principles: [
    "measure before changing code or infrastructure",
    "identify the dominant cost in the request path",
    "treat tail latency as a first class signal",
    "explain tradeoffs before claiming an optimization win",
  ],
});
