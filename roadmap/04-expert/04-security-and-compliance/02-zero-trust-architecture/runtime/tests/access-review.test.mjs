import test from "node:test";
import assert from "node:assert/strict";

import { reviewAccessRequest } from "../../dist/zero-trust/access-review.js";
import { validateCredentialPolicy } from "../../dist/zero-trust/credential-policy.js";

test("valid short-lived credential policy passes", () => {
  assert.equal(
    validateCredentialPolicy({
      ttlMinutes: 30,
      maximumTtlMinutes: 60,
    }),
    true,
  );
});

test("credential TTL above policy is rejected", () => {
  assert.throws(
    () =>
      validateCredentialPolicy({
        ttlMinutes: 120,
        maximumTtlMinutes: 60,
      }),
    /exceeds maximum allowed TTL/,
  );
});

test("access review approves allowed principal with short-lived credentials", () => {
  const result = reviewAccessRequest({
    principal: "payments-service",
    resource: "ledger.write",
    credentialTtlMinutes: 15,
  });

  assert.equal(result.approved, true);
});

test("access review rejects unauthorized or long-lived access", () => {
  const result = reviewAccessRequest({
    principal: "orders-service",
    resource: "ledger.write",
    credentialTtlMinutes: 120,
  });

  assert.equal(result.approved, false);
  assert.ok(result.reasons.length >= 1);
});
