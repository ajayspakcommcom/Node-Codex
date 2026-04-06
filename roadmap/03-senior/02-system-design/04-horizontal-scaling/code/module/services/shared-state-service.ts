import {
  ReplicaNode,
  SharedDependency,
} from "../../shared/horizontal-scaling-types.js";

export class SharedStateService {
  public evaluateSessionSafety(nodes: ReplicaNode[]): string[] {
    const statefulNodes = nodes.filter((node) => node.hasLocalSessionState);

    if (statefulNodes.length === 0) {
      return ["Session state is not pinned to local replicas."];
    }

    return [
      `${statefulNodes.length} replicas still hold local session assumptions.`,
      "Horizontal scaling remains fragile until session state is externalized.",
    ];
  }

  public evaluateDependencyPressure(dependencies: SharedDependency[]): string[] {
    return dependencies.map((dependency) => {
      const message =
        dependency.utilization > 0.85
          ? "shared dependency is already near saturation"
          : "shared dependency still has usable headroom";
      return `${dependency.name}: ${message}`;
    });
  }
}
