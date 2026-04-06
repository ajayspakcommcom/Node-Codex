import { reviewRegionalRollout } from "./saas/rollout-policy.js";

const review = reviewRegionalRollout({
  targetRegion: "eu-central-1",
  replicationLagSeconds: 4,
  maximumReplicationLagSeconds: 15,
  compatibilityVerified: true,
  controlPlaneUpdated: true,
  drainPlanDefined: true,
  abortPlanDefined: true,
});

console.log(review);
