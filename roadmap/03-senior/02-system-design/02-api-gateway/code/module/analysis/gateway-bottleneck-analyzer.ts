import {
  DownstreamCall,
  GatewayLoadProfile,
  PlatformOwnershipProfile,
} from "../../shared/gateway-types.js";

export class GatewayBottleneckAnalyzer {
  public analyzeLoad(profile: GatewayLoadProfile): {
    bottleneckRisk: "low" | "medium" | "high";
    observations: string[];
  } {
    const observations = [
      `Requests per second: ${profile.requestsPerSecond}`,
      `CPU saturation: ${(profile.cpuSaturation * 100).toFixed(0)}%`,
      `Aggregation fan-out: ${profile.aggregationCallsPerRequest.toFixed(1)} calls/request`,
    ];

    const bottleneckRisk =
      profile.cpuSaturation > 0.8 || profile.aggregationCallsPerRequest > 1.5
        ? "high"
        : profile.cpuSaturation > 0.6
          ? "medium"
          : "low";

    if (bottleneckRisk === "high") {
      observations.push("Gateway is becoming a shared critical bottleneck rather than a thin edge layer.");
    }

    return { bottleneckRisk, observations };
  }

  public analyzeAggregation(downstreams: DownstreamCall[]): string[] {
    const criticalCalls = downstreams.filter((call) => call.critical).length;
    const slowest = [...downstreams].sort((a, b) => b.p95LatencyMs - a.p95LatencyMs)[0];

    return [
      `${criticalCalls} critical downstream dependencies on the request path`,
      `Slowest downstream: ${slowest?.service ?? "n/a"} at ${slowest?.p95LatencyMs ?? 0}ms p95`,
      "Aggregation at the gateway should only exist when it materially simplifies the client or edge policy model.",
    ];
  }

  public analyzeOwnership(profile: PlatformOwnershipProfile): string[] {
    return [
      `Owning team: ${profile.owningTeam}`,
      `Onboarded services: ${profile.onboardedServices}`,
      `Policy surface area: ${profile.policySurfaceArea}`,
      `Incident coordination cost: ${profile.incidentCoordinationCost}`,
      "A gateway that many teams depend on must have explicit ownership and change discipline.",
    ];
  }
}
