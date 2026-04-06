import { logger } from "./shared/logger.js";

logger.warn("Common performance mistakes", {
  mistakes: [
    "optimizing before measuring",
    "ignoring tail latency",
    "tuning node code while the dependency remains the bottleneck",
    "using unrealistic benchmarks as proof",
    "adding complexity without evidence of meaningful gain",
  ],
});
