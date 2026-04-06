import { WorkQueueService } from "./module/services/work-queue-service.js";
import { logger } from "./shared/logger.js";

const queue = new WorkQueueService(2);

queue.tryEnqueue({ id: "job_1", costUnits: 1 });
queue.tryEnqueue({ id: "job_2", costUnits: 1 });
const thirdAccepted = queue.tryEnqueue({ id: "job_3", costUnits: 1 });

logger.info("Bounded buffer strategy", {
  thirdAccepted,
  snapshot: queue.snapshot(),
  takeaway: "bounded queues make overload visible instead of hiding it in memory growth.",
});
