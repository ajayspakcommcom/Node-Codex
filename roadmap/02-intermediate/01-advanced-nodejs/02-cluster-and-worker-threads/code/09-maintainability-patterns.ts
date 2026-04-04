import { Worker } from "node:worker_threads";

import { logger } from "./shared/logger.js";

interface WorkerJobInput {
  readonly iterations: number;
  readonly label: string;
}

class ReportWorkerGateway {
  public async generateReport(input: WorkerJobInput): Promise<unknown> {
    const worker = new Worker(new URL("./workers/cpu-worker.ts", import.meta.url), {
      workerData: input,
    });

    return new Promise<unknown>((resolve, reject) => {
      worker.once("message", resolve);
      worker.once("error", reject);
      worker.once("exit", (code) => {
        if (code !== 0) {
          reject(new Error(`Worker exited with code ${code}`));
        }
      });
    });
  }
}

async function run(): Promise<void> {
  const gateway = new ReportWorkerGateway();
  const result = await gateway.generateReport({
    iterations: 2_000_000,
    label: "gateway-managed-report",
  });

  logger.info("Maintainable worker orchestration example", {
    result,
    rule: "Keep worker creation and lifecycle rules behind a dedicated service boundary.",
  });
}

void run();
