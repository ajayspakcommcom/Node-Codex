import { EdgeRequest, GatewayRoute } from "../../shared/gateway-types.js";

export class RateLimitService {
  private readonly counters = new Map<string, number>();

  public allow(request: EdgeRequest, route: GatewayRoute, limit: number): {
    allowed: boolean;
    counterKey: string;
    usage: number;
  } {
    const counterKey = this.buildKey(request, route);
    const current = this.counters.get(counterKey) ?? 0;
    const usage = current + 1;
    this.counters.set(counterKey, usage);

    return {
      allowed: usage <= limit,
      counterKey,
      usage,
    };
  }

  private buildKey(request: EdgeRequest, route: GatewayRoute): string {
    switch (route.rateLimitKey) {
      case "user":
        return `user:${request.userId ?? "anonymous"}:${route.path}`;
      case "tenant":
        return `tenant:${request.tenantId ?? "missing"}:${route.path}`;
      default:
        return `ip:${request.ipAddress}:${route.path}`;
    }
  }
}
