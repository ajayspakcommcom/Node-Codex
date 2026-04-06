import { FairnessService } from "./module/services/fairness-service.js";
import { eventLoopRuntime } from "./shared/event-loop-runtime.js";
import { logger } from "./shared/logger.js";

async function main(): Promise<void> {
  const fairnessService = new FairnessService();

  const blocking = await fairnessService.runBlockingLoop(eventLoopRuntime.fairnessUnits);
  const cooperative = await fairnessService.runCooperativeLoop(eventLoopRuntime.fairnessUnits, 500);

  logger.info("Cooperative yield pattern", {
    blocking,
    cooperative,
    takeaway: "yielding periodically can improve scheduling fairness for other work.",
  });
}

void main();
