import type {
  RateLimitDecision,
  RateLimitRequest,
  ThrottleMetricsSnapshot,
} from "./rate-limit-types.js";

export interface ResponseEnvelope {
  readonly statusCode: number;
  readonly headers: Readonly<Record<string, string>>;
  readonly body: unknown;
}

export function createRequest(overrides: Partial<RateLimitRequest>): RateLimitRequest {
  return {
    method: overrides.method ?? "GET",
    path: overrides.path ?? "/api/orders",
    ipAddress: overrides.ipAddress ?? "203.0.113.10",
    userId: overrides.userId,
    tenantId: overrides.tenantId,
    clientId: overrides.clientId,
  };
}

export function buildRateLimitHeaders(decision: RateLimitDecision): Record<string, string> {
  const headers: Record<string, string> = {
    "X-RateLimit-Policy": decision.policyName,
    "X-RateLimit-Limit": String(decision.limit),
    "X-RateLimit-Remaining": String(decision.remaining),
    "X-RateLimit-Reset": new Date(decision.resetAtEpochMs).toISOString(),
  };

  if (decision.retryAfterSeconds !== undefined) {
    headers["Retry-After"] = String(decision.retryAfterSeconds);
  }

  if (decision.dependencyFallback !== undefined) {
    headers["X-RateLimit-Fallback"] = decision.dependencyFallback;
  }

  return headers;
}

export function toResponseEnvelope(decision: RateLimitDecision): ResponseEnvelope {
  if (decision.allowed) {
    return {
      statusCode: 200,
      headers: buildRateLimitHeaders(decision),
      body: {
        accepted: true,
        policyName: decision.policyName,
      },
    };
  }

  return {
    statusCode: 429,
    headers: buildRateLimitHeaders(decision),
    body: {
      code: "RATE_LIMITED",
      message: "Too many requests for the configured policy.",
      policyName: decision.policyName,
      retryAfterSeconds: decision.retryAfterSeconds,
    },
  };
}

export class ThrottleMetrics {
  private readonly policyHits = new Map<string, number>();
  private readonly blockedHits = new Map<string, number>();
  private readonly dependencyFallbacks = new Map<string, number>();

  public record(decision: RateLimitDecision): void {
    this.increment(this.policyHits, decision.policyName);

    if (!decision.allowed) {
      this.increment(this.blockedHits, decision.policyName);
    }

    if (decision.dependencyFallback !== undefined) {
      this.increment(this.dependencyFallbacks, `${decision.policyName}:${decision.dependencyFallback}`);
    }
  }

  public snapshot(): ThrottleMetricsSnapshot {
    return {
      policyHits: Object.fromEntries(this.policyHits),
      blockedHits: Object.fromEntries(this.blockedHits),
      dependencyFallbacks: Object.fromEntries(this.dependencyFallbacks),
    };
  }

  private increment(counter: Map<string, number>, key: string): void {
    counter.set(key, (counter.get(key) ?? 0) + 1);
  }
}
