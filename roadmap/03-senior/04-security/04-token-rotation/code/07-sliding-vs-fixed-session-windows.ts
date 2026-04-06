import { createLogger } from "./shared/logger";

const logger = createLogger("session-window");

logger.info("sliding_window", {
  behavior: "active use can extend session life within policy constraints",
});

logger.info("fixed_window", {
  behavior: "session expires at a fixed maximum age regardless of activity",
});
