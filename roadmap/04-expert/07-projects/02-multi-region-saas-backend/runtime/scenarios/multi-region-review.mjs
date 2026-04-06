import { onboardTenant } from "../../dist/saas/tenant-placement.js";
import { createFailoverPlan } from "../../dist/saas/failover-planner.js";
import { reviewRegionalRollout } from "../../dist/saas/rollout-policy.js";

const tenant = onboardTenant({
  tenantId: "tenant_eu_001",
  jurisdiction: "eu",
  requestedStrategy: "active-passive",
  approvedRegions: ["eu-west-1", "eu-central-1"],
});

const failoverPlan = createFailoverPlan({
  tenantId: tenant.tenantId,
  strategy: tenant.strategy,
  homeRegion: tenant.homeRegion,
  approvedRegions: tenant.approvedRegions,
  regionHealth: [
    { regionId: "eu-west-1", status: "unavailable", replicationLagSeconds: 0, capacityHeadroomPercent: 0 },
    { regionId: "eu-central-1", status: "healthy", replicationLagSeconds: 4, capacityHeadroomPercent: 41 },
  ],
  maximumReplicationLagSeconds: 10,
});

const rollout = reviewRegionalRollout({
  targetRegion: "eu-central-1",
  replicationLagSeconds: 4,
  maximumReplicationLagSeconds: 15,
  compatibilityVerified: true,
  controlPlaneUpdated: true,
  drainPlanDefined: true,
  abortPlanDefined: true,
});

console.log(
  JSON.stringify({
    scenario: "multi-region-review",
    homeRegion: tenant.homeRegion,
    failoverApproved: failoverPlan.shouldFailover,
    targetRegion: failoverPlan.targetRegion,
    rolloutApproved: rollout.approved,
  }),
);
