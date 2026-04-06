import test from "node:test";
import assert from "node:assert/strict";

import { reviewApiChange } from "../../dist/governance/review-gate.js";

test("additive approved change passes governance review", () => {
  const result = reviewApiChange({
    contractId: "public.catalog.products",
    currentVersion: "2026-01",
    proposedVersion: "2026-04",
    changeType: "additive",
    ownerApproved: true,
    hasDeprecationNotice: false,
    hasConsumerRolloutPlan: true,
    styleGuideSatisfied: true,
  });

  assert.equal(result.approved, true);
});

test("breaking-risk change without deprecation notice is blocked", () => {
  const result = reviewApiChange({
    contractId: "public.catalog.products",
    currentVersion: "2026-01",
    proposedVersion: "2026-04",
    changeType: "breaking-risk",
    ownerApproved: true,
    hasDeprecationNotice: false,
    hasConsumerRolloutPlan: true,
    styleGuideSatisfied: true,
  });

  assert.equal(result.approved, false);
  assert.ok(result.blockingReasons.includes("deprecation notice is required for breaking-risk changes"));
});
