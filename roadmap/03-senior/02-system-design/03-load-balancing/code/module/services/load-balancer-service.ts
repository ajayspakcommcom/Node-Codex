import {
  BackendNode,
  TrafficRequest,
} from "../../shared/load-balancing-types.js";

export class LoadBalancerService {
  private roundRobinIndex = 0;

  public roundRobin(nodes: BackendNode[], request: TrafficRequest): BackendNode {
    const healthyNodes = nodes.filter((node) => node.healthy);
    const node = healthyNodes[this.roundRobinIndex % healthyNodes.length];
    this.roundRobinIndex += 1;
    return node ?? healthyNodes[0];
  }

  public weighted(nodes: BackendNode[], request: TrafficRequest): BackendNode {
    const healthyNodes = nodes.filter((node) => node.healthy);
    const weightedPool = healthyNodes.flatMap((node) =>
      Array.from({ length: node.weight }, () => node),
    );
    return weightedPool[request.requestId.length % weightedPool.length] ?? healthyNodes[0];
  }

  public leastLoaded(nodes: BackendNode[], request: TrafficRequest): BackendNode {
    const healthyNodes = nodes.filter((node) => node.healthy);
    return (
      [...healthyNodes].sort((left, right) => {
        const leftScore = left.activeConnections + left.sessionLoad;
        const rightScore = right.activeConnections + right.sessionLoad;
        return leftScore - rightScore;
      })[0] ?? healthyNodes[0]
    );
  }
}
