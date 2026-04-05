import { ApiGatewayController } from "./module/controllers/api-gateway-controller.js";
import { PolicyRegistry, overridePolicy } from "./module/policies/policy-registry.js";
import { RateLimiterService } from "./module/services/rate-limiter-service.js";
import { FailingCounterStore } from "./module/stores/failing-counter-store.js";
import { logger } from "./shared/logger.js";
import { createRequest, ThrottleMetrics } from "./shared/rate-limit-runtime.js";

const request = createRequest({
  path: "/api/reports/monthly",
  tenantId: "tenant_enterprise",
  userId: "user_900",
  ipAddress: "198.51.100.90",
});

const failOpenPolicy = overridePolicy(new PolicyRegistry().resolve(request), {
  failureMode: "fail-open",
});

const failClosedPolicy = overridePolicy(new PolicyRegistry().resolve(request), {
  failureMode: "fail-closed",
});

const rateLimiterService = new RateLimiterService(new FailingCounterStore());

const failOpenDecision = rateLimiterService.evaluate(request, failOpenPolicy);
const failClosedDecision = rateLimiterService.evaluate(request, failClosedPolicy);

logger.warn("Fail-open vs fail-closed behavior", {
  failOpenDecision,
  failClosedDecision,
  guidance: "Failure mode should be chosen deliberately per endpoint risk because dependency outages can otherwise turn into either protection gaps or broader availability incidents.",
});
