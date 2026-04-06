import { EdgeAuthService } from "./module/services/edge-auth-service.js";
import { GatewayPolicyService } from "./module/services/gateway-policy-service.js";
import { gatewayRoutes } from "./shared/gateway-runtime.js";
import { logger } from "./shared/logger.js";

const authService = new EdgeAuthService();
const policyService = new GatewayPolicyService();
const route = gatewayRoutes[1];
const request = {
  path: route.path,
  userId: "user-42",
  tenantId: "tenant-acme",
  ipAddress: "10.0.0.14",
  scopes: ["orders:write"],
};

logger.section("Edge Authentication And Policy");
const authDecision = authService.evaluate(request, route.requiresAuth);
logger.json("Auth decision", authDecision);
const tenantDecision = policyService.authorizeTenantBoundary(route, request);
logger.json("Tenant boundary decision", tenantDecision);
