import test from "node:test";
import assert from "node:assert/strict";

import { createDefaultAuthorizationPolicy } from "../../dist/zero-trust/authorization-policy.js";

test("allowed access passes authorization policy", () => {
  const policy = createDefaultAuthorizationPolicy();

  assert.equal(
    policy.isAllowed({
      principal: "orders-service",
      resource: "payments.capture",
    }),
    true,
  );
});

test("unlisted access is blocked by authorization policy", () => {
  const policy = createDefaultAuthorizationPolicy();

  assert.equal(
    policy.isAllowed({
      principal: "orders-service",
      resource: "ledger.write",
    }),
    false,
  );
});
