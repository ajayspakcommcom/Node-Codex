import { reviewApiChange } from "./governance/review-gate.js";

console.log(
  reviewApiChange({
    contractId: "public.catalog.products",
    currentVersion: "2026-01",
    proposedVersion: "2026-04",
    changeType: "additive",
    ownerApproved: true,
    hasDeprecationNotice: false,
    hasConsumerRolloutPlan: true,
    styleGuideSatisfied: true,
  }),
);
