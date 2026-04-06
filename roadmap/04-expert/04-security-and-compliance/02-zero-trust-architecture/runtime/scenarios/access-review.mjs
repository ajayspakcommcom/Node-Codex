import { createDefaultIdentityRegistry } from "../../dist/zero-trust/identity-registry.js";
import { reviewAccessRequest } from "../../dist/zero-trust/access-review.js";

const identity = createDefaultIdentityRegistry().find("payments-service");
const review = reviewAccessRequest({
  principal: "payments-service",
  resource: "ledger.write",
  credentialTtlMinutes: 15,
});

console.log(
  JSON.stringify({
    scenario: "zero-trust-access-review",
    principal: identity.principal,
    trustTier: identity.trustTier,
    approved: review.approved,
    reasons: review.reasons,
  }),
);
