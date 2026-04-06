import type { BatchPlan } from "./pipeline-types.js";

export interface BatchPlanningInput {
  acceptedRecords: number;
  maxBatchSize: number;
  maxInFlightBatches: number;
}

export function planBatching(input: BatchPlanningInput): BatchPlan {
  const batchCount = Math.ceil(input.acceptedRecords / input.maxBatchSize);

  return {
    batchCount,
    batchSize: input.acceptedRecords === 0 ? 0 : Math.min(input.maxBatchSize, input.acceptedRecords),
    inFlightBatches: Math.min(batchCount, input.maxInFlightBatches),
  };
}
