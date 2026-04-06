import { percentile } from "../../shared/performance-runtime.js";
import type { BenchmarkSummary } from "../../shared/performance-types.js";

export class BenchmarkAnalyzer {
  public summarize(name: string, samplesMs: readonly number[]): BenchmarkSummary {
    const total = samplesMs.reduce((sum, sample) => sum + sample, 0);

    return {
      name,
      samplesMs: [...samplesMs],
      averageMs: total / samplesMs.length,
      p95Ms: percentile(samplesMs, 95),
      maxMs: Math.max(...samplesMs),
    };
  }
}
