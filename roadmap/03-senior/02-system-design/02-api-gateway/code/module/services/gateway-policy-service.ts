import {
  EdgeRequest,
  GatewayPolicyDecision,
  GatewayRoute,
} from "../../shared/gateway-types.js";

export class GatewayPolicyService {
  public routeFor(path: string, routes: GatewayRoute[]): GatewayRoute | undefined {
    return routes.find((route) => route.path === path);
  }

  public authorizeTenantBoundary(
    route: GatewayRoute,
    request: EdgeRequest,
  ): GatewayPolicyDecision {
    const reasons: string[] = [];

    if (route.rateLimitKey !== "tenant") {
      reasons.push("Route does not require tenant-scoped edge enforcement.");
      return { allowed: true, reasons };
    }

    if (!request.tenantId) {
      reasons.push("Tenant route requires tenant identity at the edge.");
      return { allowed: false, reasons };
    }

    reasons.push("Tenant identity is present for tenant-scoped route.");
    return { allowed: true, reasons };
  }
}
