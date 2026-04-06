import { BufferPressureAnalyzer } from "./module/analysis/buffer-pressure-analyzer.js";
import { WorkQueueService } from "./module/services/work-queue-service.js";
import { backpressureRuntime } from "./shared/backpressure-runtime.js";
import { logger } from "./shared/logger.js";

const queue = new WorkQueueService(backpressureRuntime.defaultQueueCapacity);
const analyzer = new BufferPressureAnalyzer();

for (let index = 0; index < backpressureRuntime.burstSize; index += 1) {
  queue.tryEnqueue({
    id: `burst_${index}`,
    costUnits: 1,
  });
}

logger.warn("Producer vs consumer imbalance", {
  snapshot: queue.snapshot(),
  analysis: analyzer.classify(queue.snapshot()),
});
