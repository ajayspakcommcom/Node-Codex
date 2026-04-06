import { ShardNode } from "../../shared/sharding-types.js";

export class HotspotAnalyzer {
  public summarize(nodes: ShardNode[]): {
    hottestShard: string;
    hotspotRisk: "low" | "medium" | "high";
    observations: string[];
  } {
    const hottest = [...nodes].sort((left, right) => {
      const leftScore = left.writeLoad + left.readLoad;
      const rightScore = right.writeLoad + right.readLoad;
      return rightScore - leftScore;
    })[0];

    const spread =
      Math.max(...nodes.map((node) => node.writeLoad)) -
      Math.min(...nodes.map((node) => node.writeLoad));

    const hotspotRisk = spread > 0.4 ? "high" : spread > 0.2 ? "medium" : "low";

    return {
      hottestShard: hottest?.id ?? "unknown",
      hotspotRisk,
      observations: nodes.map(
        (node) =>
          `${node.id}: write ${(node.writeLoad * 100).toFixed(0)}%, read ${(node.readLoad * 100).toFixed(0)}%, tenants ${node.tenantCount}`,
      ),
    };
  }
}
