import { logger } from "./shared/logger.js";
import { summarizeMemory, getMemorySnapshot } from "./shared/memory-metrics.js";

const unsafeCache = new Map<string, string>();

for (let index = 0; index < 5_000; index += 1) {
  unsafeCache.set(`response:${index}`, "x".repeat(2_000));
}

logger.warn("Unbounded cache example", {
  entries: unsafeCache.size,
  memory: summarizeMemory(getMemorySnapshot()),
  guidance: "An unbounded in-memory cache can grow with traffic until the process becomes unstable.",
});
