export type IdentityScope = "ip" | "user" | "tenant" | "client";
export type FailureMode = "fail-open" | "fail-closed";

export interface RateLimitRequest {
  readonly method: "GET" | "POST";
  readonly path: string;
  readonly ipAddress: string;
  readonly userId?: string;
  readonly tenantId?: string;
  readonly clientId?: string;
}

export interface RateLimitPolicy {
  readonly name: string;
  readonly windowMs: number;
  readonly limit: number;
  readonly scope: IdentityScope;
  readonly failureMode: FailureMode;
}

export interface CounterIncrementResult {
  readonly count: number;
  readonly resetAtEpochMs: number;
}

export interface CounterStore {
  increment(key: string, windowMs: number): CounterIncrementResult;
}

export interface RateLimitDecision {
  readonly allowed: boolean;
  readonly policyName: string;
  readonly key: string;
  readonly count: number;
  readonly limit: number;
  readonly remaining: number;
  readonly resetAtEpochMs: number;
  readonly statusCode: 200 | 429;
  readonly retryAfterSeconds?: number;
  readonly dependencyFallback?: "allowed" | "blocked";
}

export interface ThrottleMetricsSnapshot {
  readonly policyHits: Readonly<Record<string, number>>;
  readonly blockedHits: Readonly<Record<string, number>>;
  readonly dependencyFallbacks: Readonly<Record<string, number>>;
}
