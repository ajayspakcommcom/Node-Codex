import type { BenchmarkSummary } from "../../shared/performance-types.js";
import { BenchmarkAnalyzer } from "../analysis/benchmark-analyzer.js";

export class WorkloadSimulator {
  private readonly analyzer = new BenchmarkAnalyzer();

  public compare(name: string, latenciesMs: readonly number[]): BenchmarkSummary {
    return this.analyzer.summarize(name, latenciesMs);
  }

  public throughputEstimate(windowRequests: number, averageLatencyMs: number): number {
    if (averageLatencyMs <= 0) {
      return 0;
    }

    return Number(((windowRequests / averageLatencyMs) * 1000).toFixed(2));
  }
}
