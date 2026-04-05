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

for (let attempt = 1; attempt <= 4; attempt += 1) {
  responses.push(
    controller.handle(
      createRequest({
        method: "POST",
        path: "/api/auth/login",
        ipAddress: "198.51.100.55",
      }),
    ),
  );
}

logger.warn("Login endpoint protection", {
  responses,
  guidance: "Authentication routes deserve stricter policies because they face higher brute-force risk than normal business endpoints.",
});
