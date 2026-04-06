import { createLogger } from "./shared/logger.js";

const logger = createLogger("memory-gc-tuning");

const baseline = process.memoryUsage();

logger.info("heap_baseline_captured", {
  rss: baseline.rss,
  heapUsed: baseline.heapUsed,
  external: baseline.external,
});
