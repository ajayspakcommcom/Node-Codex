import { Worker } from "node:worker_threads";

import { logger } from "./shared/logger.js";

async function runFailingWorker(): Promise<void> {
  const worker = new Worker(new URL("./workers/error-worker.ts", import.meta.url));

  try {
    await new Promise<void>((resolve, reject) => {
      worker.once("error", reject);
      worker.once("exit", (code) => {
        if (code === 0) {
          resolve();
          return;
        }

        reject(new Error(`Worker exited with code ${code}`));
      });
    });
  } catch (error) {
    logger.error("Worker failure surfaced to the service boundary", {
      error,
      guidance: "Worker crashes should be logged and translated into safe application behavior.",
    });
  }
}

void runFailingWorker();
