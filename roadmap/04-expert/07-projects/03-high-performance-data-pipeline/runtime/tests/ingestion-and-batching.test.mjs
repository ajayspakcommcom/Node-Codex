import test from "node:test";
import assert from "node:assert/strict";

import { acceptRecords } from "../../dist/pipeline/ingestion-policy.js";
import { planBatching } from "../../dist/pipeline/batch-planner.js";

test("ingestion admission respects queue and worker bounds", () => {
  const decision = acceptRecords({
    queueDepth: 4700,
    maximumQueueDepth: 5000,
    recordsRequested: 600,
    availableWorkers: 12,
  });

  assert.equal(decision.acceptedRecords, 300);
  assert.equal(decision.rejectedRecords, 300);
  assert.equal(decision.backpressureActive, true);
});

test("batch planning respects configured batch and in-flight limits", () => {
  const plan = planBatching({
    acceptedRecords: 1200,
    maxBatchSize: 250,
    maxInFlightBatches: 3,
  });

  assert.equal(plan.batchCount, 5);
  assert.equal(plan.batchSize, 250);
  assert.equal(plan.inFlightBatches, 3);
});
