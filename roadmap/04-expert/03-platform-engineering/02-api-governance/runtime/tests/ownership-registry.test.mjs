import test from "node:test";
import assert from "node:assert/strict";

import { createDefaultOwnershipRegistry } from "../../dist/governance/ownership-registry.js";

test("registered contract owner can be resolved", () => {
  const registry = createDefaultOwnershipRegistry();
  const owner = registry.findOwner("public.catalog.products");

  assert.equal(owner.owningTeam, "catalog-platform");
});

test("missing owner is rejected", () => {
  const registry = createDefaultOwnershipRegistry();

  assert.throws(() => registry.findOwner("missing.contract"), /No registered owner/);
});
