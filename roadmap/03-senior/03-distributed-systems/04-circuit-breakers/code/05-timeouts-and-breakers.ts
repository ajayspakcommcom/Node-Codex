import { createLogger } from "./shared/logger";

const logger = createLogger("timeouts");

logger.info("coordination", {
  timeout: "short request timeout around dependency call",
  breaker: "opens after repeated timeout failures",
  reason: "Timeouts detect slow failure, breakers prevent repeated exposure.",
});
