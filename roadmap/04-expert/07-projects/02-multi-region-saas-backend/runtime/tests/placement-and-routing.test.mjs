import test from "node:test";
import assert from "node:assert/strict";

import { onboardTenant } from "../../dist/saas/tenant-placement.js";
import { routeTenantRequest } from "../../dist/saas/region-router.js";

test("tenant onboarding assigns the approved default home region", () => {
  const tenant = onboardTenant({
    tenantId: "tenant_eu_001",
    jurisdiction: "eu",
    requestedStrategy: "active-passive",
    approvedRegions: ["eu-west-1", "eu-central-1"],
  });

  assert.equal(tenant.homeRegion, "eu-west-1");
});

test("active-passive routing stays on the healthy home region", () => {
  const decision = routeTenantRequest({
    tenantId: "tenant_eu_001",
    strategy: "active-passive",
    homeRegion: "eu-west-1",
    approvedRegions: ["eu-west-1", "eu-central-1"],
    regionHealth: [
      { regionId: "eu-west-1", status: "healthy", replicationLagSeconds: 1, capacityHeadroomPercent: 25 },
      { regionId: "eu-central-1", status: "healthy", replicationLagSeconds: 2, capacityHeadroomPercent: 60 },
    ],
  });

  assert.equal(decision.targetRegion, "eu-west-1");
  assert.equal(decision.reason, "home-region-healthy");
});

test("active-active routing can favor another approved region with more headroom", () => {
  const decision = routeTenantRequest({
    tenantId: "tenant_global",
    strategy: "active-active",
    homeRegion: "us-east-1",
    approvedRegions: ["us-east-1", "us-west-2"],
    regionHealth: [
      { regionId: "us-east-1", status: "healthy", replicationLagSeconds: 2, capacityHeadroomPercent: 30 },
      { regionId: "us-west-2", status: "healthy", replicationLagSeconds: 2, capacityHeadroomPercent: 75 },
    ],
  });

  assert.equal(decision.targetRegion, "us-west-2");
  assert.equal(decision.reason, "capacity-weighted-routing");
});
