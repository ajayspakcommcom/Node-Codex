import { Worker } from "node:worker_threads";
import { performance } from "node:perf_hooks";

import { logger } from "./shared/logger.js";

async function runWorkerJob(): Promise<void> {
  const startTime = performance.now();
  const worker = new Worker(new URL("./workers/cpu-worker.ts", import.meta.url), {
    workerData: {
      iterations: 4_000_000,
      label: "worker-thread-report",
    },
  });

  const result = await new Promise<unknown>((resolve, reject) => {
    worker.once("message", resolve);
    worker.once("error", reject);
    worker.once("exit", (code) => {
      if (code !== 0) {
        reject(new Error(`Worker exited with code ${code}`));
      }
    });
  });

  logger.info("Worker completed CPU-heavy job", {
    durationMs: Number((performance.now() - startTime).toFixed(2)),
    result,
    guidance: "The heavy compute moved off the main thread so the event loop can stay responsive.",
  });
}

void runWorkerJob();
