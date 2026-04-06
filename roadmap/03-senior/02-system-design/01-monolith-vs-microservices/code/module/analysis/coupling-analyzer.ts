import { DependencyEdge } from "../../shared/architecture-types.js";

export class CouplingAnalyzer {
  public summarize(edges: DependencyEdge[]): {
    synchronousCriticalEdges: number;
    eventEdges: number;
    couplingRisk: "low" | "medium" | "high";
    observations: string[];
  } {
    const synchronousCriticalEdges = edges.filter(
      (edge) => edge.callType === "sync-http" && edge.criticalPath,
    ).length;
    const eventEdges = edges.filter((edge) => edge.callType === "async-event").length;

    const couplingRisk =
      synchronousCriticalEdges >= 3
        ? "high"
        : synchronousCriticalEdges >= 1
          ? "medium"
          : "low";

    const observations = [
      `${synchronousCriticalEdges} synchronous critical-path dependencies`,
      `${eventEdges} asynchronous edges`,
      couplingRisk === "high"
        ? "This architecture is at risk of turning user latency into service-chain latency."
        : "Critical-path coupling is present but still containable.",
    ];

    return {
      synchronousCriticalEdges,
      eventEdges,
      couplingRisk,
      observations,
    };
  }
}
