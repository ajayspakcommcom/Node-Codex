export interface DependencyPressureInput {
  dependencyName: string;
  p95LatencyMs: number;
  errorRatePercent: number;
}

export interface DependencyPressureResult {
  dependencyName: string;
  pressureLevel: "normal" | "elevated";
}

export function assessDependencyPressure(input: DependencyPressureInput): DependencyPressureResult {
  const pressureLevel =
    input.p95LatencyMs > 80 || input.errorRatePercent > 0.5 ? "elevated" : "normal";

  return {
    dependencyName: input.dependencyName,
    pressureLevel,
  };
}
