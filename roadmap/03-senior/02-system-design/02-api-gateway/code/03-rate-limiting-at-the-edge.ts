import { RateLimitService } from "./module/services/rate-limit-service.js";
import { gatewayRoutes } from "./shared/gateway-runtime.js";
import { logger } from "./shared/logger.js";

const service = new RateLimitService();
const route = gatewayRoutes[1];
const request = {
  path: route.path,
  userId: "user-42",
  tenantId: "tenant-acme",
  ipAddress: "10.0.0.14",
  scopes: ["orders:write"],
};

logger.section("Rate Limiting At The Edge");
for (let attempt = 1; attempt <= 4; attempt += 1) {
  const result = service.allow(request, route, 3);
  logger.line(
    `Attempt ${attempt}: allowed=${String(result.allowed)} key=${result.counterKey} usage=${result.usage}`,
  );
}
