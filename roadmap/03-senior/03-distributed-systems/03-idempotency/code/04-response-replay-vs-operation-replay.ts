import { createLogger } from "./shared/logger";

const logger = createLogger("replay-strategy");

logger.info("response_replay", {
  useCase: "Return the same payment response for a duplicate client request.",
  benefit: "Fast and deterministic client behavior.",
});

logger.info("operation_replay", {
  useCase: "Rebuild a derived projection from an event log.",
  benefit: "Useful for recovery and reprocessing workflows.",
});
