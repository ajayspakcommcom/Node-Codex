import { BoundedCache } from "../shared/bounded-cache.mjs";
import { printMemoryReport } from "../shared/memory-report.mjs";

function buildPayload(index) {
  return {
    key: `item_${index}`,
    payload: "x".repeat(2_048),
  };
}

const unboundedCache = new Map();
const boundedCache = new BoundedCache(500);

for (let index = 0; index < 5_000; index += 1) {
  const payload = buildPayload(index);
  unboundedCache.set(payload.key, payload);
  boundedCache.set(payload.key, payload);
}

printMemoryReport("cache_growth_comparison", {
  unboundedEntries: unboundedCache.size,
  boundedEntries: boundedCache.size(),
});
