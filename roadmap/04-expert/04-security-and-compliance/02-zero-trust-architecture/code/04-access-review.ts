import { reviewAccessRequest } from "./zero-trust/access-review.js";

console.log(
  reviewAccessRequest({
    principal: "payments-service",
    resource: "ledger.write",
    credentialTtlMinutes: 15,
  }),
);
