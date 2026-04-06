import { EventLoopLagMonitor } from "./module/analysis/event-loop-lag-monitor.js";
import { blockCpuFor, eventLoopRuntime, nowMs, sleep } from "./shared/event-loop-runtime.js";
import { logger } from "./shared/logger.js";

async function main(): Promise<void> {
  const monitor = new EventLoopLagMonitor();

  const healthy = await monitor.measure(eventLoopRuntime.defaultDelayMs);
  const startedAt = nowMs();
  const degradedPromise = sleep(eventLoopRuntime.defaultDelayMs).then(() => nowMs() - startedAt);
  blockCpuFor(eventLoopRuntime.blockingWorkMs);
  const observedDelayMs = await degradedPromise;
  const degraded = {
    expectedDelayMs: eventLoopRuntime.defaultDelayMs,
    observedDelayMs,
    lagMs: Math.max(0, observedDelayMs - eventLoopRuntime.defaultDelayMs),
  };

  logger.info("Event loop lag monitoring", {
    healthy,
    degraded,
    takeaway: "lag is an operational signal that the main thread is being delayed.",
  });
}

void main();
