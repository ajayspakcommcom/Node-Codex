export interface LoadTestResult {
  p95LatencyMs: number;
  p99LatencyMs: number;
  errorRatePercent: number;
  sustainedRps: number;
}

export interface LoadTestSummary {
  sustainedRps: number;
  healthyTailLatency: boolean;
  healthyErrorRate: boolean;
}

export function summarizeLoadTestResult(result: LoadTestResult): LoadTestSummary {
  return {
    sustainedRps: result.sustainedRps,
    healthyTailLatency: result.p95LatencyMs <= 250 && result.p99LatencyMs <= 500,
    healthyErrorRate: result.errorRatePercent <= 1,
  };
}
