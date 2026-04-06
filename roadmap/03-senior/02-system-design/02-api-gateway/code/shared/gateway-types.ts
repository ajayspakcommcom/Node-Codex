export interface GatewayRoute {
  path: string;
  targetService: string;
  requiresAuth: boolean;
  rateLimitKey: "ip" | "user" | "tenant";
  aggregates?: string[];
}

export interface EdgeRequest {
  path: string;
  tenantId?: string;
  userId?: string;
  ipAddress: string;
  scopes: string[];
}

export interface GatewayPolicyDecision {
  allowed: boolean;
  reasons: string[];
}

export interface DownstreamCall {
  service: string;
  p95LatencyMs: number;
  failureRate: number;
  critical: boolean;
}

export interface GatewayLoadProfile {
  requestsPerSecond: number;
  cpuSaturation: number;
  authChecksPerSecond: number;
  aggregationCallsPerRequest: number;
}

export interface PlatformOwnershipProfile {
  owningTeam: string;
  onboardedServices: number;
  policySurfaceArea: "low" | "medium" | "high";
  incidentCoordinationCost: "low" | "medium" | "high";
}
