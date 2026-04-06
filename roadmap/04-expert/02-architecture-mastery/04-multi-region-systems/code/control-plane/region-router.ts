import { ResidencyPolicy } from "../data-plane/residency-policy.js";
import { RegionRegistry } from "./region-registry.js";

interface TenantRoutingRequest {
  readonly tenantId: string;
  readonly primaryRegion: string;
  readonly allowedFailoverRegions: readonly string[];
  readonly residency: "apac" | "eu" | "global";
}

export class RegionRouter {
  private readonly residencyPolicy = new ResidencyPolicy();

  constructor(private readonly regionRegistry: RegionRegistry) {}

  route(request: TenantRoutingRequest): string {
    if (
      this.regionRegistry.isHealthy(request.primaryRegion) &&
      this.residencyPolicy.isRegionAllowed(request.residency, request.primaryRegion)
    ) {
      return request.primaryRegion;
    }

    const failoverRegion = request.allowedFailoverRegions.find(
      (region) =>
        this.regionRegistry.isHealthy(region) &&
        this.residencyPolicy.isRegionAllowed(request.residency, region),
    );

    if (!failoverRegion) {
      throw new Error(`no healthy region available for tenant ${request.tenantId}`);
    }

    return failoverRegion;
  }
}
