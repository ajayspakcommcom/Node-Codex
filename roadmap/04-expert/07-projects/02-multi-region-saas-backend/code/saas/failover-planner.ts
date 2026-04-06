import type { TenantStrategy } from "./tenant-placement.js";
import type { RegionHealthSnapshot } from "./region-router.js";

export interface FailoverPlanInput {
  tenantId: string;
  strategy: TenantStrategy;
  homeRegion: string;
  approvedRegions: string[];
  regionHealth: RegionHealthSnapshot[];
  maximumReplicationLagSeconds: number;
}

export interface FailoverPlan {
  tenantId: string;
  shouldFailover: boolean;
  targetRegion: string | null;
  reason: string;
}

export function createFailoverPlan(input: FailoverPlanInput): FailoverPlan {
  if (input.strategy === "active-active") {
    return {
      tenantId: input.tenantId,
      shouldFailover: false,
      targetRegion: null,
      reason: "active-active-routing-handles-regional-loss",
    };
  }

  const homeRegion = input.regionHealth.find((region) => region.regionId === input.homeRegion);

  if (homeRegion && homeRegion.status !== "unavailable") {
    return {
      tenantId: input.tenantId,
      shouldFailover: false,
      targetRegion: null,
      reason: "home-region-still-available",
    };
  }

  const candidate = input.regionHealth.find(
    (region) =>
      region.regionId !== input.homeRegion &&
      input.approvedRegions.includes(region.regionId) &&
      region.status === "healthy" &&
      region.replicationLagSeconds <= input.maximumReplicationLagSeconds,
  );

  if (!candidate) {
    return {
      tenantId: input.tenantId,
      shouldFailover: false,
      targetRegion: null,
      reason: "no-approved-secondary-region-meets-health-and-lag-policy",
    };
  }

  return {
    tenantId: input.tenantId,
    shouldFailover: true,
    targetRegion: candidate.regionId,
    reason: "approved-secondary-region-ready",
  };
}
