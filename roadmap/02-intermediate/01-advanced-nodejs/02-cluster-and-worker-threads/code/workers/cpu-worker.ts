import { parentPort, workerData } from "node:worker_threads";

import { runCpuHeavyReport } from "../shared/cpu-tasks.js";

interface WorkerDataShape {
  readonly iterations: number;
  readonly label: string;
}

const data = workerData as WorkerDataShape;
const result = runCpuHeavyReport(data);

parentPort?.postMessage(result);
