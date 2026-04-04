import { Worker } from "node:worker_threads";

import { logger } from "./shared/logger.js";

const sharedBuffer = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * 2);
const sharedView = new Int32Array(sharedBuffer);
sharedView[0] = 10;
sharedView[1] = 20;

const worker = new Worker(
  `
    const { parentPort, workerData } = require("node:worker_threads");
    const values = new Int32Array(workerData.sharedBuffer);
    values[0] = values[0] + values[1];
    parentPort.postMessage({ updatedFirstValue: values[0] });
  `,
  {
    eval: true,
    workerData: {
      sharedBuffer,
    },
  },
);

worker.once("message", (message) => {
  logger.info("Shared memory example completed", {
    workerMessage: message,
    mainThreadView: [...sharedView],
    guidance: "Shared memory is possible, but it adds complexity and should be introduced carefully.",
  });
});
