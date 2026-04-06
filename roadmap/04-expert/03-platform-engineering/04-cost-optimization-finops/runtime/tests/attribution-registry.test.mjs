import test from "node:test";
import assert from "node:assert/strict";

import { createDefaultAttributionRegistry } from "../../dist/finops/attribution-registry.js";

test("registered cost owner can be resolved", () => {
  const registry = createDefaultAttributionRegistry();
  const owner = registry.findOwner("catalog-api");

  assert.equal(owner.owningTeam, "commerce-platform");
});

test("missing cost owner is rejected", () => {
  const registry = createDefaultAttributionRegistry();

  assert.throws(() => registry.findOwner("missing-service"), /No cost owner registered/);
});
