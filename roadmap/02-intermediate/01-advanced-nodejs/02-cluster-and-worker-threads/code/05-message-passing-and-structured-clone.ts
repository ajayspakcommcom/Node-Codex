import { Worker } from "node:worker_threads";

import { logger } from "./shared/logger.js";

async function runMessageWorker(): Promise<void> {
  const worker = new Worker(new URL("./workers/message-worker.ts", import.meta.url));

  const result = await new Promise<unknown>((resolve, reject) => {
    worker.once("message", resolve);
    worker.once("error", reject);
    worker.postMessage({
      taskId: "sum-001",
      payload: [10, 20, 30, 40],
    });
  });

  logger.info("Worker message result", {
    result,
    guidance: "Use explicit message contracts and remember that transferred payload size still affects performance.",
  });

  await worker.terminate();
}

void runMessageWorker();
