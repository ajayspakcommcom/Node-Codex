export interface ChaosExperiment {
  name: string;
  hypothesis: string;
  failureType: string;
}

export function createDefaultExperiment(): ChaosExperiment {
  return {
    name: "payments-db-slowdown",
    hypothesis: "Order placement stays within p95 latency budget during a temporary payment database slowdown.",
    failureType: "dependency-latency",
  };
}
