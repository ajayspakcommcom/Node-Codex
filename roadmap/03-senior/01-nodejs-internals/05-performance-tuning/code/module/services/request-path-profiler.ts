import type { RequestCostBreakdown } from "../../shared/performance-types.js";

export class RequestPathProfiler {
  public profile(input: {
    readonly cpuMs: number;
    readonly dependencyMs: number;
    readonly serializationMs: number;
  }): RequestCostBreakdown {
    return {
      cpuMs: input.cpuMs,
      dependencyMs: input.dependencyMs,
      serializationMs: input.serializationMs,
      totalMs: input.cpuMs + input.dependencyMs + input.serializationMs,
    };
  }
}
