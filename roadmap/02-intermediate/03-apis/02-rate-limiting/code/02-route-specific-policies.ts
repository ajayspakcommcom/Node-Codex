import { ApiGatewayController } from "./module/controllers/api-gateway-controller.js";
import { PolicyRegistry } from "./module/policies/policy-registry.js";
import { RateLimiterService } from "./module/services/rate-limiter-service.js";
import { InMemoryCounterStore } from "./module/stores/in-memory-counter-store.js";
import { logger } from "./shared/logger.js";
import { createRequest, ThrottleMetrics } from "./shared/rate-limit-runtime.js";

const controller = new ApiGatewayController(
  new PolicyRegistry(),
  new RateLimiterService(new InMemoryCounterStore()),
  new ThrottleMetrics(),
);

const publicResponse = controller.handle(
  createRequest({
    path: "/public/catalog",
    ipAddress: "198.51.100.1",
  }),
);

const reportResponse = controller.handle(
  createRequest({
    path: "/api/reports/monthly",
    userId: "user_101",
    tenantId: "tenant_enterprise",
    ipAddress: "198.51.100.2",
  }),
);

const partnerResponse = controller.handle(
  createRequest({
    path: "/api/partner-sync/orders",
    clientId: "partner-crm",
    ipAddress: "198.51.100.3",
  }),
);

logger.info("Route-specific rate-limit policies", {
  publicResponse,
  reportResponse,
  partnerResponse,
  guidance: "Enterprise APIs usually need different policies for public traffic, heavy reports, and partner integrations instead of one global threshold.",
});
