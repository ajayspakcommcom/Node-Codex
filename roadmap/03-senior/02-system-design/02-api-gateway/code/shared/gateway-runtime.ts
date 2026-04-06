import {
  DownstreamCall,
  GatewayLoadProfile,
  GatewayRoute,
  PlatformOwnershipProfile,
} from "./gateway-types.js";

export const gatewayRoutes: GatewayRoute[] = [
  {
    path: "/api/catalog/products",
    targetService: "catalog-service",
    requiresAuth: false,
    rateLimitKey: "ip",
  },
  {
    path: "/api/orders/checkout",
    targetService: "checkout-service",
    requiresAuth: true,
    rateLimitKey: "user",
    aggregates: ["inventory-service", "payment-service"],
  },
  {
    path: "/api/tenant/reporting/summary",
    targetService: "reporting-service",
    requiresAuth: true,
    rateLimitKey: "tenant",
    aggregates: ["billing-service", "usage-service"],
  },
];

export const checkoutDownstreams: DownstreamCall[] = [
  { service: "inventory-service", p95LatencyMs: 85, failureRate: 0.01, critical: true },
  { service: "payment-service", p95LatencyMs: 140, failureRate: 0.02, critical: true },
];

export const reportingDownstreams: DownstreamCall[] = [
  { service: "billing-service", p95LatencyMs: 180, failureRate: 0.03, critical: true },
  { service: "usage-service", p95LatencyMs: 220, failureRate: 0.04, critical: false },
];

export const gatewayLoadProfiles: GatewayLoadProfile[] = [
  {
    requestsPerSecond: 1800,
    cpuSaturation: 0.48,
    authChecksPerSecond: 1200,
    aggregationCallsPerRequest: 0.3,
  },
  {
    requestsPerSecond: 5200,
    cpuSaturation: 0.86,
    authChecksPerSecond: 4100,
    aggregationCallsPerRequest: 1.8,
  },
];

export const platformOwnershipProfile: PlatformOwnershipProfile = {
  owningTeam: "platform-edge",
  onboardedServices: 18,
  policySurfaceArea: "high",
  incidentCoordinationCost: "high",
};
