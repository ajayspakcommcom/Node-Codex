import type {
  CounterStore,
  RateLimitDecision,
  RateLimitPolicy,
  RateLimitRequest,
} from "../../shared/rate-limit-types.js";
import { CounterStoreUnavailableError } from "../stores/failing-counter-store.js";

export class RateLimiterService {
  public constructor(private readonly counterStore: CounterStore) {}

  public evaluate(request: RateLimitRequest, policy: RateLimitPolicy): RateLimitDecision {
    const key = this.buildKey(request, policy);

    try {
      const counterResult = this.counterStore.increment(key, policy.windowMs);
      const allowed = counterResult.count <= policy.limit;
      const retryAfterSeconds = allowed
        ? undefined
        : Math.max(1, Math.ceil((counterResult.resetAtEpochMs - Date.now()) / 1000));

      return {
        allowed,
        policyName: policy.name,
        key,
        count: counterResult.count,
        limit: policy.limit,
        remaining: Math.max(0, policy.limit - counterResult.count),
        resetAtEpochMs: counterResult.resetAtEpochMs,
        statusCode: allowed ? 200 : 429,
        retryAfterSeconds,
      };
    } catch (error) {
      if (!(error instanceof CounterStoreUnavailableError)) {
        throw error;
      }

      const fallbackAllowed = policy.failureMode === "fail-open";
      const fallbackResetAtEpochMs = Date.now() + policy.windowMs;

      return {
        allowed: fallbackAllowed,
        policyName: policy.name,
        key,
        count: 0,
        limit: policy.limit,
        remaining: fallbackAllowed ? policy.limit : 0,
        resetAtEpochMs: fallbackResetAtEpochMs,
        statusCode: fallbackAllowed ? 200 : 429,
        retryAfterSeconds: fallbackAllowed ? undefined : Math.ceil(policy.windowMs / 1000),
        dependencyFallback: fallbackAllowed ? "allowed" : "blocked",
      };
    }
  }

  private buildKey(request: RateLimitRequest, policy: RateLimitPolicy): string {
    switch (policy.scope) {
      case "ip":
        return `${policy.name}:ip:${request.ipAddress}`;
      case "user":
        return `${policy.name}:user:${request.userId ?? "anonymous"}`;
      case "tenant":
        return `${policy.name}:tenant:${request.tenantId ?? "unknown-tenant"}`;
      case "client":
        return `${policy.name}:client:${request.clientId ?? "anonymous-client"}`;
    }
  }
}
