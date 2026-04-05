import type { RateLimitPolicy, RateLimitRequest } from "../../shared/rate-limit-types.js";

const defaultPolicies = {
  login: {
    name: "login-protection",
    windowMs: 60_000,
    limit: 3,
    scope: "ip",
    failureMode: "fail-closed",
  },
  reports: {
    name: "report-generation",
    windowMs: 60_000,
    limit: 2,
    scope: "tenant",
    failureMode: "fail-open",
  },
  partnerSync: {
    name: "partner-sync",
    windowMs: 60_000,
    limit: 4,
    scope: "client",
    failureMode: "fail-closed",
  },
  defaultApi: {
    name: "authenticated-api",
    windowMs: 60_000,
    limit: 5,
    scope: "user",
    failureMode: "fail-open",
  },
  publicApi: {
    name: "public-api",
    windowMs: 60_000,
    limit: 2,
    scope: "ip",
    failureMode: "fail-closed",
  },
} satisfies Record<string, RateLimitPolicy>;

export class PolicyRegistry {
  public resolve(request: RateLimitRequest): RateLimitPolicy {
    if (request.path === "/api/auth/login") {
      return defaultPolicies.login;
    }

    if (request.path.startsWith("/api/reports")) {
      return defaultPolicies.reports;
    }

    if (request.path.startsWith("/api/partner-sync")) {
      return defaultPolicies.partnerSync;
    }

    if (request.userId !== undefined) {
      return defaultPolicies.defaultApi;
    }

    return defaultPolicies.publicApi;
  }
}

export function overridePolicy(basePolicy: RateLimitPolicy, overrides: Partial<RateLimitPolicy>): RateLimitPolicy {
  return {
    ...basePolicy,
    ...overrides,
  };
}
