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

const responses = [];

for (let attempt = 1; attempt <= 3; attempt += 1) {
  responses.push(
    controller.handle(
      createRequest({
        path: "/public/catalog",
        ipAddress: "198.51.100.7",
      }),
    ),
  );
}

logger.info("Fixed-window in-memory rate limiting", {
  responses,
  guidance: "Fixed-window counters are easy to understand, but they are best for bounded examples or single-instance behavior rather than distributed enforcement.",
});
