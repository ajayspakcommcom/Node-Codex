import { createLogger } from "./shared/logger";

const logger = createLogger("exactly-once");

logger.info("myth", {
  statement: "Exactly once is guaranteed everywhere.",
  reality:
    "Most systems achieve practical safety through at-least-once delivery plus idempotent handling.",
});
