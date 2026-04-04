import { BoundedCache } from "./shared/bounded-cache.js";
import { logger } from "./shared/logger.js";
import { getMemorySnapshot, summarizeMemory } from "./shared/memory-metrics.js";

const boundedCache = new BoundedCache<string>(100, 60_000);

for (let index = 0; index < 500; index += 1) {
  boundedCache.set(`response:${index}`, "x".repeat(2_000));
}

logger.info("Bounded cache example", {
  entries: boundedCache.size(),
  memory: summarizeMemory(getMemorySnapshot()),
  guidance: "Every in-memory cache should have a limit or eviction strategy.",
});
