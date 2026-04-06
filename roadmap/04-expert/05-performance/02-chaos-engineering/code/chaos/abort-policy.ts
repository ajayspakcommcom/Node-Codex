export interface AbortPolicyInput {
  p95LatencyMs: number;
  errorRatePercent: number;
  abortP95LatencyMs: number;
  abortErrorRatePercent: number;
}

export function shouldAbortExperiment(input: AbortPolicyInput): boolean {
  return input.p95LatencyMs >= input.abortP95LatencyMs || input.errorRatePercent >= input.abortErrorRatePercent;
}
