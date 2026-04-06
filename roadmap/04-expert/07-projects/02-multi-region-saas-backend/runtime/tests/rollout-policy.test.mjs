import test from "node:test";
import assert from "node:assert/strict";

import { reviewRegionalRollout } from "../../dist/saas/rollout-policy.js";

test("regional rollout is approved when compatibility and safeguards are present", () => {
  const review = reviewRegionalRollout({
    targetRegion: "eu-central-1",
    replicationLagSeconds: 5,
    maximumReplicationLagSeconds: 15,
    compatibilityVerified: true,
    controlPlaneUpdated: true,
    drainPlanDefined: true,
    abortPlanDefined: true,
  });

  assert.equal(review.approved, true);
  assert.equal(review.blockingReasons.length, 0);
});

test("regional rollout is blocked when lag or rollback safeguards are missing", () => {
  const review = reviewRegionalRollout({
    targetRegion: "eu-central-1",
    replicationLagSeconds: 20,
    maximumReplicationLagSeconds: 15,
    compatibilityVerified: false,
    controlPlaneUpdated: true,
    drainPlanDefined: false,
    abortPlanDefined: false,
  });

  assert.equal(review.approved, false);
  assert.deepEqual(review.blockingReasons, [
    "replication-lag-exceeds-threshold",
    "multi-version-compatibility-not-verified",
    "drain-plan-missing",
    "abort-plan-missing",
  ]);
});
