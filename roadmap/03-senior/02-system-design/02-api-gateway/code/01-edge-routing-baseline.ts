import { GatewayPolicyService } from "./module/services/gateway-policy-service.js";
import { gatewayRoutes } from "./shared/gateway-runtime.js";
import { logger } from "./shared/logger.js";

const service = new GatewayPolicyService();

logger.section("Edge Routing Baseline");
for (const route of gatewayRoutes) {
  const resolved = service.routeFor(route.path, gatewayRoutes);
  logger.line(`${route.path} -> ${resolved?.targetService ?? "unresolved"}`);
}
