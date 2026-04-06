import { logger } from "./shared/logger.js";

logger.warn("Common event loop mistakes", {
  mistakes: [
    "running CPU heavy work inside request handlers",
    "assuming promise based code is always cheap",
    "using process.nextTick recursively without understanding starvation risk",
    "ignoring event loop lag until incidents appear",
    "assuming timers fire exactly on schedule under production load",
  ],
});
