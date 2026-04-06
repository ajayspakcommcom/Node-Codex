import { createLogger } from "./shared/logger.js";

const logger = createLogger("cqrs");

logger.info("command_vs_query_model", {
  writeModelOwns: ["invariants", "state transitions"],
  readModelOwns: ["query shape", "consumer-friendly summaries"],
});
