export interface RetentionSubject {
  readonly name: string;
  readonly retainedObjects: number;
  readonly growthTrend: "stable" | "growing";
  readonly bounded: boolean;
}

export interface HeapSignal {
  readonly usedHeapMb: number;
  readonly rssMb: number;
  readonly gcPressure: "low" | "medium" | "high";
}

export interface LeakAssessment {
  readonly riskLevel: "low" | "medium" | "high";
  readonly findings: readonly string[];
}
