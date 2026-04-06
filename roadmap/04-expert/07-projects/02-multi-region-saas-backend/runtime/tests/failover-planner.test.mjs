import test from "node:test";
import assert from "node:assert/strict";

import { createFailoverPlan } from "../../dist/saas/failover-planner.js";

test("failover is approved when the primary is unavailable and the secondary meets lag policy", () => {
  const plan = createFailoverPlan({
    tenantId: "tenant_us_002",
    strategy: "active-passive",
    homeRegion: "us-east-1",
    approvedRegions: ["us-east-1", "us-west-2"],
    regionHealth: [
      { regionId: "us-east-1", status: "unavailable", replicationLagSeconds: 0, capacityHeadroomPercent: 0 },
      { regionId: "us-west-2", status: "healthy", replicationLagSeconds: 5, capacityHeadroomPercent: 40 },
    ],
    maximumReplicationLagSeconds: 10,
  });

  assert.equal(plan.shouldFailover, true);
  assert.equal(plan.targetRegion, "us-west-2");
});

test("failover is blocked when no approved secondary region satisfies lag policy", () => {
  const plan = createFailoverPlan({
    tenantId: "tenant_us_003",
    strategy: "active-passive",
    homeRegion: "us-east-1",
    approvedRegions: ["us-east-1", "us-west-2"],
    regionHealth: [
      { regionId: "us-east-1", status: "unavailable", replicationLagSeconds: 0, capacityHeadroomPercent: 0 },
      { regionId: "us-west-2", status: "healthy", replicationLagSeconds: 25, capacityHeadroomPercent: 40 },
    ],
    maximumReplicationLagSeconds: 10,
  });

  assert.equal(plan.shouldFailover, false);
  assert.equal(plan.reason, "no-approved-secondary-region-meets-health-and-lag-policy");
});
