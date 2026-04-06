import { ReplicaNode } from "../../shared/horizontal-scaling-types.js";

export class ReplicaRoutingService {
  public chooseStatelessReplica(nodes: ReplicaNode[]): ReplicaNode {
    return (
      [...nodes]
        .filter((node) => !node.hasLocalSessionState)
        .sort((left, right) => left.requestsPerSecond - right.requestsPerSecond)[0] ??
      nodes[0]
    );
  }
}
