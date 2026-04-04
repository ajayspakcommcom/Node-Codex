import { Worker } from "node:worker_threads";

import { logger } from "./shared/logger.js";

async function runWorkerWithTimeout(): Promise<void> {
  const worker = new Worker(new URL("./workers/cpu-worker.ts", import.meta.url), {
    workerData: {
      iterations: 20_000_000,
      label: "timeout-controlled-job",
    },
  });

  const timeout = setTimeout(async () => {
    logger.warn("Worker timeout reached; terminating job", {
      job: "timeout-controlled-job",
    });
    await worker.terminate();
  }, 25);

  try {
    const result = await new Promise<unknown>((resolve, reject) => {
      worker.once("message", resolve);
      worker.once("error", reject);
      worker.once("exit", (code) => {
        if (code !== 0) {
          reject(new Error(`Worker exited with code ${code}`));
        }
      });
    });

    logger.info("Worker finished before timeout", {
      result,
    });
  } catch (error) {
    logger.warn("Worker did not complete normally", {
      error,
    });
  } finally {
    clearTimeout(timeout);
  }
}

void runWorkerWithTimeout();
