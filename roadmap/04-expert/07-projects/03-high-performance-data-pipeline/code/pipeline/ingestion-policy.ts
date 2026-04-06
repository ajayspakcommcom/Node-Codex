import type { IngestionDecision, IngestionRequest } from "./pipeline-types.js";

export function acceptRecords(input: IngestionRequest): IngestionDecision {
  const remainingCapacity = Math.max(0, input.maximumQueueDepth - input.queueDepth);
  const workerLimitedCapacity = input.availableWorkers * 100;
  const acceptedRecords = Math.min(input.recordsRequested, remainingCapacity, workerLimitedCapacity);

  return {
    acceptedRecords,
    rejectedRecords: input.recordsRequested - acceptedRecords,
    backpressureActive: acceptedRecords < input.recordsRequested,
  };
}
