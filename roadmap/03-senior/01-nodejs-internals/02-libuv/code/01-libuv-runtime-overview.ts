import { logger } from "./shared/logger.js";

logger.info("Libuv runtime overview", {
  responsibilities: [
    "event loop coordination",
    "thread pool based work",
    "filesystem operations",
    "some dns lookups",
    "async runtime scheduling outside the main JavaScript stack",
  ],
  enterpriseFocus: [
    "thread pool contention",
    "runtime delegation awareness",
    "latency sensitive path protection",
  ],
});
