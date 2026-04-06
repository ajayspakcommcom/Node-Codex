import { RequestPathSimulator } from "./module/services/request-path-simulator.js";
import { eventLoopRuntime } from "./shared/event-loop-runtime.js";
import { logger } from "./shared/logger.js";

async function main(): Promise<void> {
  const simulator = new RequestPathSimulator();
  const result = await simulator.run({
    requestName: "price-recalculation",
    blockingMs: eventLoopRuntime.blockingWorkMs,
    timerDelayMs: eventLoopRuntime.defaultDelayMs,
  });

  logger.warn("Blocking request path latency", {
    result,
    budgetMs: eventLoopRuntime.requestBudgetMs,
    budgetExceeded: result.totalElapsedMs > eventLoopRuntime.requestBudgetMs,
  });
}

void main();
