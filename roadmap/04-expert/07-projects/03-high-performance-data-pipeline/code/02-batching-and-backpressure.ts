import { planBatching } from "./pipeline/batch-planner.js";

const plan = planBatching({
  acceptedRecords: 1200,
  maxBatchSize: 250,
  maxInFlightBatches: 4,
});

console.log(plan);
