import { ApiGatewayController } from "./module/controllers/api-gateway-controller.js";
import { PolicyRegistry } from "./module/policies/policy-registry.js";
import { RateLimiterService } from "./module/services/rate-limiter-service.js";
import { RedisLikeCounterStore } from "./module/stores/redis-like-counter-store.js";
import { logger } from "./shared/logger.js";
import { createRequest, ThrottleMetrics } from "./shared/rate-limit-runtime.js";

const instanceOne = new ApiGatewayController(
  new PolicyRegistry(),
  new RateLimiterService(new RedisLikeCounterStore()),
  new ThrottleMetrics(),
);

const instanceTwo = new ApiGatewayController(
  new PolicyRegistry(),
  new RateLimiterService(new RedisLikeCounterStore()),
  new ThrottleMetrics(),
);

const request = createRequest({
  path: "/api/partner-sync/orders",
  clientId: "partner-crm",
  ipAddress: "203.0.113.30",
});

const responses = [
  instanceOne.handle(request),
  instanceTwo.handle(request),
  instanceOne.handle(request),
  instanceTwo.handle(request),
  instanceOne.handle(request),
];

logger.info("Distributed counter awareness", {
  responses,
  guidance: "A shared store keeps limits consistent across horizontally scaled instances, which in-memory per-process counters cannot do safely.",
});
