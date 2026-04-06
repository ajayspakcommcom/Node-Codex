export type ErrorCategory = "transient" | "permanent";

export interface IngestionRequest {
  queueDepth: number;
  maximumQueueDepth: number;
  recordsRequested: number;
  availableWorkers: number;
}

export interface IngestionDecision {
  acceptedRecords: number;
  rejectedRecords: number;
  backpressureActive: boolean;
}

export interface BatchPlan {
  batchCount: number;
  batchSize: number;
  inFlightBatches: number;
}
