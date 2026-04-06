import test from "node:test";
import assert from "node:assert/strict";

import { createDefaultIdentityRegistry } from "../../dist/zero-trust/identity-registry.js";

test("registered workload identity can be resolved", () => {
  const registry = createDefaultIdentityRegistry();
  const identity = registry.find("payments-service");

  assert.equal(identity.owner, "payments-platform");
});

test("missing identity is rejected", () => {
  const registry = createDefaultIdentityRegistry();

  assert.throws(() => registry.find("missing-service"), /No identity registered/);
});
