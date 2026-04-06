import test from "node:test";
import assert from "node:assert/strict";

import { createDefaultAuthorizationPolicy } from "../../dist/mesh/authorization-policy.js";

test("allowed service call passes authorization policy", () => {
  const policy = createDefaultAuthorizationPolicy();

  assert.equal(
    policy.isAllowed({
      sourceService: "orders-service",
      destinationService: "payments-service",
    }),
    true,
  );
});

test("disallowed service call is blocked by authorization policy", () => {
  const policy = createDefaultAuthorizationPolicy();

  assert.equal(
    policy.isAllowed({
      sourceService: "catalog-service",
      destinationService: "ledger-service",
    }),
    false,
  );
});
