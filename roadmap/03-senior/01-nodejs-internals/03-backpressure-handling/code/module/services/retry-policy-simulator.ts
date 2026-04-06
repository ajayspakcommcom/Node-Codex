import type { RetryResult } from "../../shared/backpressure-types.js";
import { WorkQueueService } from "./work-queue-service.js";

export class RetryPolicySimulator {
  public simulateAmplifiedRetries(queue: WorkQueueService, attempts: number): RetryResult {
    let acceptedAttempts = 0;
    let rejectedAttempts = 0;

    for (let attempt = 0; attempt < attempts; attempt += 1) {
      const accepted = queue.tryEnqueue({
        id: `retry_${attempt}`,
        costUnits: 1,
      });

      if (accepted) {
        acceptedAttempts += 1;
      } else {
        rejectedAttempts += 1;
      }
    }

    return {
      attempts,
      acceptedAttempts,
      rejectedAttempts,
    };
  }
}
