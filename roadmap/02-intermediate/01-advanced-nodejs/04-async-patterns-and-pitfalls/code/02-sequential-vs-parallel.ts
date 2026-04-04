import { performance } from "node:perf_hooks";

import { fetchDependency } from "./shared/fake-clients.js";
import { logger } from "./shared/logger.js";

async function runSequential(): Promise<void> {
  const startTime = performance.now();

  await fetchDependency("users", 60);
  await fetchDependency("billing", 60);
  await fetchDependency("inventory", 60);

  logger.info("Sequential flow completed", {
    durationMs: Number((performance.now() - startTime).toFixed(2)),
  });
}

async function runParallel(): Promise<void> {
  const startTime = performance.now();

  await Promise.all([
    fetchDependency("users", 60),
    fetchDependency("billing", 60),
    fetchDependency("inventory", 60),
  ]);

  logger.info("Parallel flow completed", {
    durationMs: Number((performance.now() - startTime).toFixed(2)),
    guidance: "Parallelism is good only when concurrency is safe for the dependencies involved.",
  });
}

void runSequential().then(runParallel);
