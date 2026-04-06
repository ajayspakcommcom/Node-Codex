import test from "node:test";
import assert from "node:assert/strict";

import { reviewPipelineHealth } from "../../dist/pipeline/pipeline-health.js";

test("pipeline health stays healthy when lag and dead-letter counts are controlled", () => {
  const review = reviewPipelineHealth({
    queueDepth: 1800,
    maximumQueueDepth: 5000,
    consumerLagSeconds: 12,
    maximumConsumerLagSeconds: 30,
    deadLetterCount: 2,
    deadLetterThreshold: 10,
  });

  assert.equal(review.healthy, true);
  assert.deepEqual(review.concerns, []);
});

test("pipeline health surfaces queue, lag, and dead-letter concerns", () => {
  const review = reviewPipelineHealth({
    queueDepth: 4500,
    maximumQueueDepth: 5000,
    consumerLagSeconds: 45,
    maximumConsumerLagSeconds: 30,
    deadLetterCount: 14,
    deadLetterThreshold: 10,
  });

  assert.equal(review.healthy, false);
  assert.deepEqual(review.concerns, [
    "queue-depth-near-capacity",
    "consumer-lag-exceeds-threshold",
    "dead-letter-count-exceeds-threshold",
  ]);
});
