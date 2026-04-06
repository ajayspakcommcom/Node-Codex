import { onboardTenant } from "./saas/tenant-placement.js";

const tenant = onboardTenant({
  tenantId: "tenant_eu_001",
  jurisdiction: "eu",
  requestedStrategy: "active-passive",
  approvedRegions: ["eu-west-1", "eu-central-1"],
});

console.log({
  tenantId: tenant.tenantId,
  homeRegion: tenant.homeRegion,
  strategy: tenant.strategy,
});
