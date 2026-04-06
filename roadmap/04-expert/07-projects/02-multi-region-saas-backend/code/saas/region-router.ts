import type { TenantStrategy } from "./tenant-placement.js";

export type RegionStatus = "healthy" | "degraded" | "unavailable";

export interface RegionHealthSnapshot {
  regionId: string;
  status: RegionStatus;
  replicationLagSeconds: number;
  capacityHeadroomPercent: number;
}

export interface RoutingRequest {
  tenantId: string;
  strategy: TenantStrategy;
  homeRegion: string;
  approvedRegions: string[];
  regionHealth: RegionHealthSnapshot[];
}

export interface RoutingDecision {
  tenantId: string;
  targetRegion: string;
  reason: string;
  strategy: TenantStrategy;
}

function isRoutable(region: RegionHealthSnapshot): boolean {
  return region.status !== "unavailable" && region.capacityHeadroomPercent > 10;
}

export function routeTenantRequest(request: RoutingRequest): RoutingDecision {
  const regions = request.regionHealth.filter((region) => request.approvedRegions.includes(region.regionId));
  const healthy = regions.filter(isRoutable);

  if (request.strategy === "active-passive") {
    const home = healthy.find((region) => region.regionId === request.homeRegion);
    if (home) {
      return {
        tenantId: request.tenantId,
        targetRegion: home.regionId,
        reason: "home-region-healthy",
        strategy: request.strategy,
      };
    }
  }

  const bestCandidate = healthy
    .slice()
    .sort((left, right) => right.capacityHeadroomPercent - left.capacityHeadroomPercent)[0];

  if (!bestCandidate) {
    throw new Error(`No routable region available for tenant ${request.tenantId}`);
  }

  return {
    tenantId: request.tenantId,
    targetRegion: bestCandidate.regionId,
    reason: request.strategy === "active-active" ? "capacity-weighted-routing" : "failover-routing",
    strategy: request.strategy,
  };
}
