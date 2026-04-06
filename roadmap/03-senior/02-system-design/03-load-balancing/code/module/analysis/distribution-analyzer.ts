import {
  BackendNode,
  DistributionSnapshot,
  TrafficRequest,
} from "../../shared/load-balancing-types.js";

export class DistributionAnalyzer {
  public buildSnapshot(
    assignments: Array<{ request: TrafficRequest; node: BackendNode }>,
  ): DistributionSnapshot {
    const perNodeAssignments: Record<string, number> = {};

    for (const assignment of assignments) {
      perNodeAssignments[assignment.node.id] =
        (perNodeAssignments[assignment.node.id] ?? 0) + 1;
    }

    const values = Object.values(perNodeAssignments);
    const max = values.length > 0 ? Math.max(...values) : 0;
    const min = values.length > 0 ? Math.min(...values) : 0;
    const hotspotRisk = max - min >= 3 ? "high" : max - min >= 2 ? "medium" : "low";

    return {
      totalRequests: assignments.length,
      perNodeAssignments,
      hotspotRisk,
    };
  }

  public summarizeZones(nodes: BackendNode[]): string[] {
    const perZone = new Map<string, number>();
    for (const node of nodes) {
      perZone.set(node.zone, (perZone.get(node.zone) ?? 0) + 1);
    }

    return Array.from(perZone.entries()).map(
      ([zone, count]) => `${zone}: ${count} backend nodes`,
    );
  }
}
