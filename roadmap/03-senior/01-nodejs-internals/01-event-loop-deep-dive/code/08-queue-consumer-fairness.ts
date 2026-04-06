import { blockCpuFor, eventLoopRuntime, sleep } from "./shared/event-loop-runtime.js";
import { logger } from "./shared/logger.js";

async function main(): Promise<void> {
  let healthCheckExecutions = 0;

  const healthCheckPromise = sleep(5).then(() => {
    healthCheckExecutions += 1;
  });

  for (let batch = 0; batch < 3; batch += 1) {
    blockCpuFor(eventLoopRuntime.defaultDelayMs);
  }

  await healthCheckPromise;

  logger.warn("Queue consumer fairness", {
    healthCheckExecutions,
    risk: "consumer loops that do not yield can delay health checks and unrelated request work.",
  });
}

void main();
