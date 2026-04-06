import type { BottleneckAssessment, RequestCostBreakdown } from "../../shared/performance-types.js";

export class BottleneckAnalyzer {
  public assess(costs: RequestCostBreakdown): BottleneckAssessment {
    const entries = [
      { key: "cpu", value: costs.cpuMs },
      { key: "dependency", value: costs.dependencyMs },
      { key: "serialization", value: costs.serializationMs },
    ] as const;

    const sorted = [...entries].sort((left, right) => right.value - left.value);
    const dominant = sorted[0];
    const second = sorted[1];

    if (dominant === undefined) {
      return {
        dominantConstraint: "mixed",
        recommendation: "collect more evidence before tuning",
      };
    }

    if (second !== undefined && Math.abs(dominant.value - second.value) <= 5) {
      return {
        dominantConstraint: "mixed",
        recommendation: "cost is split across layers, so optimize the full path rather than one isolated function",
      };
    }

    if (dominant.key === "cpu") {
      return {
        dominantConstraint: "cpu",
        recommendation: "profile synchronous work and consider reducing compute on the request path",
      };
    }

    if (dominant.key === "dependency") {
      return {
        dominantConstraint: "dependency",
        recommendation: "measure downstream latency and reduce dependency round trips before micro-optimizing Node code",
      };
    }

    return {
      dominantConstraint: "serialization",
      recommendation: "review payload shape and serialization cost before changing infrastructure size",
    };
  }
}
