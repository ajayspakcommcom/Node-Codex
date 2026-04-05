import type { PolicyRegistry } from "../policies/policy-registry.js";
import type { RateLimiterService } from "../services/rate-limiter-service.js";
import type { ThrottleMetrics } from "../../shared/rate-limit-runtime.js";
import {
  toResponseEnvelope,
  type ResponseEnvelope,
} from "../../shared/rate-limit-runtime.js";
import type { RateLimitRequest } from "../../shared/rate-limit-types.js";

export class ApiGatewayController {
  public constructor(
    private readonly policyRegistry: PolicyRegistry,
    private readonly rateLimiterService: RateLimiterService,
    private readonly throttleMetrics: ThrottleMetrics,
  ) {}

  public handle(request: RateLimitRequest): ResponseEnvelope {
    const policy = this.policyRegistry.resolve(request);
    const decision = this.rateLimiterService.evaluate(request, policy);
    this.throttleMetrics.record(decision);
    return toResponseEnvelope(decision);
  }
}
