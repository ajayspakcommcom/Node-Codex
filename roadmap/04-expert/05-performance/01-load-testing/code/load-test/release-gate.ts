export interface ReleaseGateThresholds {
  maxP95LatencyMs: number;
  maxP99LatencyMs: number;
  maxErrorRatePercent: number;
}

export interface ReleaseGateInput {
  p95LatencyMs: number;
  p99LatencyMs: number;
  errorRatePercent: number;
  thresholds: ReleaseGateThresholds;
}

export interface ReleaseGateResult {
  approved: boolean;
  blockingReasons: readonly string[];
}

export function evaluateReleaseGate(input: ReleaseGateInput): ReleaseGateResult {
  const blockingReasons: string[] = [];

  if (input.p95LatencyMs > input.thresholds.maxP95LatencyMs) {
    blockingReasons.push("p95 latency exceeds threshold");
  }

  if (input.p99LatencyMs > input.thresholds.maxP99LatencyMs) {
    blockingReasons.push("p99 latency exceeds threshold");
  }

  if (input.errorRatePercent > input.thresholds.maxErrorRatePercent) {
    blockingReasons.push("error rate exceeds threshold");
  }

  return {
    approved: blockingReasons.length === 0,
    blockingReasons,
  };
}
