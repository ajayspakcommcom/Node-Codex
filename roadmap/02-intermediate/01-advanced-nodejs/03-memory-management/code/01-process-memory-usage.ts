import { logger } from "./shared/logger.js";
import { getMemorySnapshot, summarizeMemory } from "./shared/memory-metrics.js";

const snapshot = getMemorySnapshot();

logger.info("Process memory usage snapshot", {
  memory: summarizeMemory(snapshot),
  guidance: "Use process.memoryUsage() to observe trends, not just one-off values.",
});
