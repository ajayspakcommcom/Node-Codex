export interface RequestCostBreakdown {
  readonly cpuMs: number;
  readonly dependencyMs: number;
  readonly serializationMs: number;
  readonly totalMs: number;
}

export interface BenchmarkSummary {
  readonly name: string;
  readonly samplesMs: readonly number[];
  readonly averageMs: number;
  readonly p95Ms: number;
  readonly maxMs: number;
}

export interface BottleneckAssessment {
  readonly dominantConstraint: "cpu" | "dependency" | "serialization" | "mixed";
  readonly recommendation: string;
}
