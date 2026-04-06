import { acceptRecords } from "../../dist/pipeline/ingestion-policy.js";
import { planBatching } from "../../dist/pipeline/batch-planner.js";
import { reviewPipelineHealth } from "../../dist/pipeline/pipeline-health.js";

const ingestion = acceptRecords({
  queueDepth: 2200,
  maximumQueueDepth: 5000,
  recordsRequested: 900,
  availableWorkers: 10,
});

const batching = planBatching({
  acceptedRecords: ingestion.acceptedRecords,
  maxBatchSize: 200,
  maxInFlightBatches: 4,
});

const health = reviewPipelineHealth({
  queueDepth: 2200 + ingestion.acceptedRecords,
  maximumQueueDepth: 5000,
  consumerLagSeconds: 16,
  maximumConsumerLagSeconds: 30,
  deadLetterCount: 3,
  deadLetterThreshold: 10,
});

console.log(
  JSON.stringify({
    scenario: "pipeline-review",
    acceptedRecords: ingestion.acceptedRecords,
    batchCount: batching.batchCount,
    backpressureActive: ingestion.backpressureActive,
    healthy: health.healthy,
  }),
);
