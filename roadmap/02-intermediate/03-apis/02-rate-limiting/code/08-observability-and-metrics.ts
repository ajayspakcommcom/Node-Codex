import { ApiGatewayController } from "./module/controllers/api-gateway-controller.js";
import { PolicyRegistry } from "./module/policies/policy-registry.js";
import { RateLimiterService } from "./module/services/rate-limiter-service.js";
import { InMemoryCounterStore } from "./module/stores/in-memory-counter-store.js";
import { logger } from "./shared/logger.js";
import { createRequest, ThrottleMetrics } from "./shared/rate-limit-runtime.js";

const metrics = new ThrottleMetrics();
const controller = new ApiGatewayController(
  new PolicyRegistry(),
  new RateLimiterService(new InMemoryCounterStore()),
  metrics,
);

controller.handle(
  createRequest({
    path: "/public/catalog",
    ipAddress: "198.51.100.10",
  }),
);

controller.handle(
  createRequest({
    path: "/api/reports/monthly",
    tenantId: "tenant_alpha",
    userId: "user_alpha",
    ipAddress: "198.51.100.20",
  }),
);

controller.handle(
  createRequest({
    path: "/api/auth/login",
    method: "POST",
    ipAddress: "198.51.100.30",
  }),
);

controller.handle(
  createRequest({
    path: "/api/auth/login",
    method: "POST",
    ipAddress: "198.51.100.30",
  }),
);

controller.handle(
  createRequest({
    path: "/api/auth/login",
    method: "POST",
    ipAddress: "198.51.100.30",
  }),
);

controller.handle(
  createRequest({
    path: "/api/auth/login",
    method: "POST",
    ipAddress: "198.51.100.30",
  }),
);

logger.info("Observability and metrics", {
  metrics: metrics.snapshot(),
  guidance: "Enterprise rate limiting needs observable policy hits and block rates so teams can tune thresholds with real traffic evidence.",
});
