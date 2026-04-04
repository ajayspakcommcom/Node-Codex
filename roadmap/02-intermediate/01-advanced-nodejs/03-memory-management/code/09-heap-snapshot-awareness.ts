import v8 from "node:v8";

import { logger } from "./shared/logger.js";

const heapStatistics = v8.getHeapStatistics();

logger.info("Heap snapshot awareness", {
  totalHeapSize: heapStatistics.total_heap_size,
  usedHeapSize: heapStatistics.used_heap_size,
  heapSizeLimit: heapStatistics.heap_size_limit,
  guidance:
    "Use heap statistics and snapshots to confirm what is being retained before changing code blindly.",
});
