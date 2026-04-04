import { createLogger } from "./shared/logger.js";
import { getRuntimeSummary } from "./shared/runtime.js";

const logger = createLogger("operational-concerns");

logger.info("Operational runtime snapshot", {
  runtime: getRuntimeSummary(),
  memoryUsage: process.memoryUsage(),
  uptimeSeconds: process.uptime(),
  note: "Real services need observable startup, memory, and process health signals",
});
