export type Jurisdiction = "us" | "eu" | "apac";
export type TenantStrategy = "active-passive" | "active-active";

export interface TenantPlacementRequest {
  tenantId: string;
  jurisdiction: Jurisdiction;
  requestedStrategy: TenantStrategy;
  approvedRegions: string[];
}

export interface TenantPlacementRecord {
  tenantId: string;
  jurisdiction: Jurisdiction;
  strategy: TenantStrategy;
  homeRegion: string;
  approvedRegions: string[];
}

const defaultRegionByJurisdiction: Record<Jurisdiction, string> = {
  us: "us-east-1",
  eu: "eu-west-1",
  apac: "ap-southeast-1",
};

export function onboardTenant(request: TenantPlacementRequest): TenantPlacementRecord {
  const defaultRegion = defaultRegionByJurisdiction[request.jurisdiction];

  if (!request.approvedRegions.includes(defaultRegion)) {
    throw new Error(`Default region ${defaultRegion} is not approved for tenant ${request.tenantId}`);
  }

  return {
    tenantId: request.tenantId,
    jurisdiction: request.jurisdiction,
    strategy: request.requestedStrategy,
    homeRegion: defaultRegion,
    approvedRegions: [...request.approvedRegions],
  };
}
