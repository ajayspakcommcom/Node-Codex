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

controller.handle(
  createRequest({
    path: "/public/catalog",
    ipAddress: "203.0.113.44",
  }),
);

controller.handle(
  createRequest({
    path: "/public/catalog",
    ipAddress: "203.0.113.44",
  }),
);

const throttledResponse = controller.handle(
  createRequest({
    path: "/public/catalog",
    ipAddress: "203.0.113.44",
  }),
);

logger.warn("Rate-limit headers and 429 behavior", {
  throttledResponse,
  guidance: "Good APIs return explicit 429 responses with enough metadata for clients to understand remaining budget and retry timing.",
});
