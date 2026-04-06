export interface DependencyLatencyInput {
  dependencyName: string;
  p95LatencyMs: number;
  budgetMs: number;
}

export interface DependencyLatencyResult {
  dependencyName: string;
  overBudget: boolean;
}

export function assessDependencyLatency(input: DependencyLatencyInput): DependencyLatencyResult {
  return {
    dependencyName: input.dependencyName,
    overBudget: input.p95LatencyMs > input.budgetMs,
  };
}
