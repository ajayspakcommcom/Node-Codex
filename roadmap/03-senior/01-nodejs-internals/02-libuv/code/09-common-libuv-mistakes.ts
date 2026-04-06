import { logger } from "./shared/logger.js";

logger.warn("Common libuv mistakes", {
  mistakes: [
    "assuming all async work scales the same way",
    "saturating the worker pool with background crypto or filesystem work",
    "ignoring dns and filesystem runtime costs",
    "treating thread pool contention as generic slowness without profiling",
    "changing architecture before understanding runtime bottlenecks",
  ],
});
