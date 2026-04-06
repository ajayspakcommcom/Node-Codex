import { DownstreamCall } from "../../shared/gateway-types.js";

export class RequestAggregationService {
  public estimateUserLatency(downstreams: DownstreamCall[]): {
    estimatedP95LatencyMs: number;
    warning: string;
  } {
    const estimatedP95LatencyMs = downstreams.reduce(
      (sum, dependency) => sum + dependency.p95LatencyMs,
      0,
    );

    const highRiskDependency = downstreams.find(
      (dependency) => dependency.failureRate >= 0.03,
    );

    const warning = highRiskDependency
      ? `Aggregation is sensitive to ${highRiskDependency.service} failure behavior.`
      : "Aggregation risk is manageable but still adds critical-path latency.";

    return { estimatedP95LatencyMs, warning };
  }

  public shouldAggregateAtGateway(downstreams: DownstreamCall[]): string[] {
    const reasons = [
      "Gateway aggregation is useful only when the edge contract becomes meaningfully simpler.",
      "The gateway should not become a hidden orchestration layer for domain workflows.",
    ];

    if (downstreams.length > 2) {
      reasons.push("Fan-out is growing and may turn the gateway into a latency concentrator.");
    }

    return reasons;
  }
}
