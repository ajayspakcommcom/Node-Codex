import { blockCpuFor, eventLoopRuntime, nowMs, sleep } from "./shared/event-loop-runtime.js";
import { logger } from "./shared/logger.js";

async function main(): Promise<void> {
  const plannedDelayMs = 15;
  const startedAt = nowMs();
  const timerPromise = sleep(plannedDelayMs).then(() => nowMs() - startedAt);

  blockCpuFor(eventLoopRuntime.blockingWorkMs);
  const observedDelayMs = await timerPromise;

  logger.warn("Timer drift under load", {
    plannedDelayMs,
    observedDelayMs,
    driftMs: Math.max(0, observedDelayMs - plannedDelayMs),
  });
}

void main();
