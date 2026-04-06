import test from "node:test";
import assert from "node:assert/strict";

import { createDefaultControlRegistry } from "../../dist/compliance/control-registry.js";

test("registered control can be resolved", () => {
  const registry = createDefaultControlRegistry();
  const control = registry.find("soc2-access-review");

  assert.equal(control.owner, "platform-security");
});

test("missing control is rejected", () => {
  const registry = createDefaultControlRegistry();

  assert.throws(() => registry.find("missing-control"), /No compliance control registered/);
});
