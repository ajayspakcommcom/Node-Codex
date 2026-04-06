import { createFailoverPlan } from "./saas/failover-planner.js";

const plan = createFailoverPlan({
  tenantId: "tenant_us_002",
  strategy: "active-passive",
  homeRegion: "us-east-1",
  approvedRegions: ["us-east-1", "us-west-2"],
  regionHealth: [
    { regionId: "us-east-1", status: "unavailable", replicationLagSeconds: 0, capacityHeadroomPercent: 0 },
    { regionId: "us-west-2", status: "healthy", replicationLagSeconds: 3, capacityHeadroomPercent: 40 },
  ],
  maximumReplicationLagSeconds: 10,
});

console.log(plan);
