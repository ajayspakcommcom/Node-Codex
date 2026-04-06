import { BufferPressureAnalyzer } from "./module/analysis/buffer-pressure-analyzer.js";
import { WorkQueueService } from "./module/services/work-queue-service.js";
import { logger } from "./shared/logger.js";

const queue = new WorkQueueService(4);
const analyzer = new BufferPressureAnalyzer();

queue.tryEnqueue({ id: "job_1", costUnits: 1 });
queue.tryEnqueue({ id: "job_2", costUnits: 1 });
queue.tryEnqueue({ id: "job_3", costUnits: 1 });

logger.info("Queue growth as overload signal", {
  snapshot: queue.snapshot(),
  analysis: analyzer.classify(queue.snapshot()),
});
