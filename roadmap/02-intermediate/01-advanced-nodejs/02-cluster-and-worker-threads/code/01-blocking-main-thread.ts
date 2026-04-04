import { performance } from "node:perf_hooks";

import { runCpuHeavyReport } from "./shared/cpu-tasks.js";
import { logger } from "./shared/logger.js";

const startTime = performance.now();

const result = runCpuHeavyReport({
  iterations: 4_000_000,
  label: "blocking-main-thread",
});

logger.warn("CPU-heavy work completed on the main thread", {
  durationMs: Number((performance.now() - startTime).toFixed(2)),
  result,
  guidance: "This pattern can delay unrelated requests because the event loop stays blocked during computation.",
});
