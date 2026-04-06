export interface LatencyProfileInput {
  p50Ms: number;
  p95Ms: number;
  p99Ms: number;
}

export interface LatencyProfileSummary {
  tailLatencyConcern: boolean;
  spreadMs: number;
}

export function summarizeLatencyProfile(input: LatencyProfileInput): LatencyProfileSummary {
  return {
    tailLatencyConcern: input.p99Ms > input.p95Ms * 2,
    spreadMs: input.p99Ms - input.p50Ms,
  };
}
