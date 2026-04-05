import { logger } from "./shared/logger.js";

logger.warn("Common PM2 mistakes", {
  mistakes: [
    "using watch mode in a production-style environment",
    "relying on restart loops instead of investigating crashes",
    "enabling cluster mode without planning for multi-process behavior",
    "keeping secrets directly in ecosystem config",
    "treating PM2 as full observability instead of one operational tool",
  ],
});
