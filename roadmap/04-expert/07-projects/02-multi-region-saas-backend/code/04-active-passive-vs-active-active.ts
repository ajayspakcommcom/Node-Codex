import { routeTenantRequest } from "./saas/region-router.js";

const activePassive = routeTenantRequest({
  tenantId: "tenant_ap",
  strategy: "active-passive",
  homeRegion: "ap-southeast-1",
  approvedRegions: ["ap-southeast-1", "ap-northeast-1"],
  regionHealth: [
    { regionId: "ap-southeast-1", status: "healthy", replicationLagSeconds: 1, capacityHeadroomPercent: 35 },
    { regionId: "ap-northeast-1", status: "healthy", replicationLagSeconds: 1, capacityHeadroomPercent: 55 },
  ],
});

const activeActive = routeTenantRequest({
  tenantId: "tenant_global",
  strategy: "active-active",
  homeRegion: "us-east-1",
  approvedRegions: ["us-east-1", "us-west-2"],
  regionHealth: [
    { regionId: "us-east-1", status: "healthy", replicationLagSeconds: 2, capacityHeadroomPercent: 30 },
    { regionId: "us-west-2", status: "healthy", replicationLagSeconds: 2, capacityHeadroomPercent: 60 },
  ],
});

console.log({ activePassive, activeActive });
