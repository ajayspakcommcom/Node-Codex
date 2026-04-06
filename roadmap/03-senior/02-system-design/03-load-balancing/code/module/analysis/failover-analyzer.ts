import { BackendNode, HealthCheckResult } from "../../shared/load-balancing-types.js";

export class FailoverAnalyzer {
  public summarize(results: HealthCheckResult[], nodes: BackendNode[]): string[] {
    const unhealthy = results.filter((result) => !result.healthy);
    const remainingHealthy = nodes.filter((node) =>
      results.some((result) => result.nodeId === node.id && result.healthy),
    ).length;

    return [
      `${unhealthy.length} unhealthy nodes detected`,
      `${remainingHealthy} healthy nodes remain for traffic`,
      unhealthy.length > 0
        ? "Failover behavior must be verified before production incidents force it."
        : "Current pool health supports balanced failover.",
    ];
  }
}
