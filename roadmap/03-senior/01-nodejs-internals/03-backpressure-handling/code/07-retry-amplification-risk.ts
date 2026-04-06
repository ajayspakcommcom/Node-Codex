import { RetryPolicySimulator } from "./module/services/retry-policy-simulator.js";
import { WorkQueueService } from "./module/services/work-queue-service.js";
import { logger } from "./shared/logger.js";

const queue = new WorkQueueService(2);
const retrySimulator = new RetryPolicySimulator();

const result = retrySimulator.simulateAmplifiedRetries(queue, 5);

logger.warn("Retry amplification risk", {
  result,
  snapshot: queue.snapshot(),
  takeaway: "blind retries can amplify overload instead of helping recovery.",
});
