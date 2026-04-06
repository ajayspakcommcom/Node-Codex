export interface SteadyStateInput {
  p95LatencyMs: number;
  errorRatePercent: number;
  maxP95LatencyMs: number;
  maxErrorRatePercent: number;
}

export function evaluateSteadyState(input: SteadyStateInput): boolean {
  return input.p95LatencyMs <= input.maxP95LatencyMs && input.errorRatePercent <= input.maxErrorRatePercent;
}
