import { ShardNode } from "../../shared/sharding-types.js";

export class ShardRouter {
  public routeByTenant(tenantId: number, nodes: ShardNode[]): ShardNode {
    const index = tenantId % nodes.length;
    return nodes[index] ?? nodes[0];
  }

  public routeByHashedKey(hash: number, nodes: ShardNode[]): ShardNode {
    const index = Math.abs(hash) % nodes.length;
    return nodes[index] ?? nodes[0];
  }
}
