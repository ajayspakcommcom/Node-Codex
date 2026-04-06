import { reviewApiChange } from "./governance/review-gate.js";

console.log(
  reviewApiChange({
    contractId: "internal.orders.fulfillment",
    currentVersion: "2026-01",
    proposedVersion: "2026-04",
    changeType: "breaking-risk",
    ownerApproved: true,
    hasDeprecationNotice: true,
    hasConsumerRolloutPlan: true,
    styleGuideSatisfied: true,
  }),
);
