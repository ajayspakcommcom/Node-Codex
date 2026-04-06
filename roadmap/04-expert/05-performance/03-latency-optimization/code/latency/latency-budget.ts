import type { PathSegment } from "./critical-path.js";

export interface LatencyBudgetInput {
  totalBudgetMs: number;
  segments: readonly PathSegment[];
}

export interface LatencyBudgetResult {
  withinBudget: boolean;
  totalObservedLatencyMs: number;
}

export function validateLatencyBudget(input: LatencyBudgetInput): LatencyBudgetResult {
  const totalObservedLatencyMs = input.segments.reduce((sum, segment) => sum + segment.latencyMs, 0);

  return {
    withinBudget: totalObservedLatencyMs <= input.totalBudgetMs,
    totalObservedLatencyMs,
  };
}
