import { createDefaultOwnershipRegistry } from "../../dist/governance/ownership-registry.js";
import { reviewApiChange } from "../../dist/governance/review-gate.js";
import { validateDeprecationWindow } from "../../dist/governance/deprecation-policy.js";

const owner = createDefaultOwnershipRegistry().findOwner("public.catalog.products");

const review = reviewApiChange({
  contractId: "public.catalog.products",
  currentVersion: "2026-01",
  proposedVersion: "2026-04",
  changeType: "breaking-risk",
  ownerApproved: true,
  hasDeprecationNotice: true,
  hasConsumerRolloutPlan: true,
  styleGuideSatisfied: true,
});

validateDeprecationWindow({
  announcedOn: "2026-04-01",
  removalOn: "2026-07-15",
  minimumDays: 60,
});

console.log(
  JSON.stringify({
    scenario: "api-governance-review",
    owner: owner.owningTeam,
    approved: review.approved,
    blockingReasons: review.blockingReasons,
  }),
);
