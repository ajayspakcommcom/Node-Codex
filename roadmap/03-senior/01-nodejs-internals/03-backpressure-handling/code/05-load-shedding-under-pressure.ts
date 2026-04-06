import { WorkQueueService } from "./module/services/work-queue-service.js";
import { logger } from "./shared/logger.js";

const queue = new WorkQueueService(1);

queue.tryEnqueue({ id: "critical_job", costUnits: 1 });
const shed = !queue.tryEnqueue({ id: "overflow_job", costUnits: 1 });

logger.warn("Load shedding under pressure", {
  shed,
  snapshot: queue.snapshot(),
  takeaway: "rejecting excess work can be safer than accepting work the system cannot process.",
});
