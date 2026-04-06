import { routeTenantRequest } from "./saas/region-router.js";

const decision = routeTenantRequest({
  tenantId: "tenant_eu_001",
  strategy: "active-active",
  homeRegion: "eu-west-1",
  approvedRegions: ["eu-west-1", "eu-central-1"],
  regionHealth: [
    { regionId: "eu-west-1", status: "healthy", replicationLagSeconds: 1, capacityHeadroomPercent: 42 },
    { regionId: "eu-central-1", status: "healthy", replicationLagSeconds: 2, capacityHeadroomPercent: 38 },
  ],
});

console.log(decision);
