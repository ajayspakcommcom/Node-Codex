import { logger } from "./shared/logger.js";

logger.info("Practice exercises", {
  exercises: [
    "Add a benchmark summary that compares p50, p95, and max latency.",
    "Simulate a CPU heavy request path and compare it with a dependency heavy one.",
    "Add a tuning report that recommends optimize, scale, or redesign based on the bottleneck.",
    "Create a workload where batching improves throughput but hurts p95 latency.",
    "Add a caching scenario and show when it improves the dominant bottleneck and when it does not.",
  ],
});
