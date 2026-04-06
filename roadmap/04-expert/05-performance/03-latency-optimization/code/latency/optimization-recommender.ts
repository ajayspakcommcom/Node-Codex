export interface OptimizationInput {
  bottleneckType: "dependency" | "serialization" | "compute" | "network";
  tailLatencyDominant: boolean;
}

export interface OptimizationRecommendation {
  recommendation: string;
}

export function recommendOptimization(input: OptimizationInput): OptimizationRecommendation {
  if (input.bottleneckType === "dependency" && input.tailLatencyDominant) {
    return {
      recommendation: "reduce dependency tail latency with budget review, caching, or concurrency shaping",
    };
  }

  if (input.bottleneckType === "serialization") {
    return {
      recommendation: "optimize payload size and serialization path",
    };
  }

  return {
    recommendation: "profile the critical path and optimize the dominant bottleneck",
  };
}
