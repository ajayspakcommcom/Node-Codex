import {
  BackendNode,
  HealthCheckResult,
} from "../../shared/load-balancing-types.js";

export class HealthCheckService {
  public run(nodes: BackendNode[]): HealthCheckResult[] {
    return nodes.map((node) => ({
      nodeId: node.id,
      healthy: node.healthy && node.avgLatencyMs < 120,
      reason:
        node.healthy && node.avgLatencyMs < 120
          ? "Node passed health thresholds."
          : "Node failed health or latency threshold.",
    }));
  }
}
