import { parentPort } from "node:worker_threads";

parentPort?.on("message", (message: { readonly taskId: string; readonly payload: readonly number[] }) => {
  const sum = message.payload.reduce((total, value) => total + value, 0);

  parentPort?.postMessage({
    taskId: message.taskId,
    sum,
    itemCount: message.payload.length,
  });
});
