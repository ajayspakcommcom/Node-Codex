import { EdgeRequest, GatewayPolicyDecision } from "../../shared/gateway-types.js";

export class EdgeAuthService {
  public evaluate(request: EdgeRequest, requiresAuth: boolean): GatewayPolicyDecision {
    const reasons: string[] = [];

    if (!requiresAuth) {
      reasons.push("Route is public at the edge.");
      return { allowed: true, reasons };
    }

    if (!request.userId) {
      reasons.push("Missing authenticated user.");
      return { allowed: false, reasons };
    }

    reasons.push("Authenticated user identity is present.");

    if (request.scopes.length === 0) {
      reasons.push("No scopes were attached to the request.");
    }

    return { allowed: true, reasons };
  }
}
