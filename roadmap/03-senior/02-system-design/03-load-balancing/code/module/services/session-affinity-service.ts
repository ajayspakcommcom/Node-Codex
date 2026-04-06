import {
  BackendNode,
  TrafficRequest,
} from "../../shared/load-balancing-types.js";

export class SessionAffinityService {
  private readonly sessionMap = new Map<string, string>();

  public routeWithAffinity(
    nodes: BackendNode[],
    request: TrafficRequest,
  ): { node: BackendNode; reusedAffinity: boolean } {
    const healthyNodes = nodes.filter((node) => node.healthy);

    if (request.sessionId) {
      const pinnedNodeId = this.sessionMap.get(request.sessionId);
      const pinnedNode = healthyNodes.find((node) => node.id === pinnedNodeId);
      if (pinnedNode) {
        return { node: pinnedNode, reusedAffinity: true };
      }
    }

    const chosen = healthyNodes[0] ?? nodes[0];
    if (request.sessionId && chosen) {
      this.sessionMap.set(request.sessionId, chosen.id);
    }

    return { node: chosen, reusedAffinity: false };
  }
}
