import { createLogger } from "./shared/logger.js";
import { getRuntimeSummary } from "./shared/runtime.js";

const logger = createLogger("runtime-overview");

logger.info("Node runtime overview", {
  runtime: "node",
  engine: "v8",
  processModel: "single Node.js process with one main JavaScript thread",
  summary: getRuntimeSummary(),
});
