import {
  ReplicaNode,
  SharedDependency,
} from "../../shared/horizontal-scaling-types.js";

export class ScalingBottleneckAnalyzer {
  public analyzeReplicas(nodes: ReplicaNode[]): string[] {
    const localStateReplicas = nodes.filter((node) => node.hasLocalSessionState).length;
    const maxCpu = Math.max(...nodes.map((node) => node.cpuSaturation));

    const notes = [
      `${nodes.length} replicas are active`,
      `Max replica CPU saturation: ${(maxCpu * 100).toFixed(0)}%`,
    ];

    if (localStateReplicas > 0) {
      notes.push(`${localStateReplicas} replicas still depend on local session state.`);
    }

    return notes;
  }

  public analyzeDependencies(dependencies: SharedDependency[]): {
    dominantConstraint: string;
    observations: string[];
  } {
    const dominant = [...dependencies].sort((left, right) => {
      const leftScore = left.utilization * 100 + left.p95LatencyMs;
      const rightScore = right.utilization * 100 + right.p95LatencyMs;
      return rightScore - leftScore;
    })[0];

    return {
      dominantConstraint: dominant?.name ?? "unknown",
      observations: dependencies.map(
        (dependency) =>
          `${dependency.name}: utilization ${(dependency.utilization * 100).toFixed(0)}%, p95 ${dependency.p95LatencyMs}ms`,
      ),
    };
  }
}
