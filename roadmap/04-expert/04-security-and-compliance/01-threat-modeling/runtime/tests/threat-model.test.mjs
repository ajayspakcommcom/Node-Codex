import test from "node:test";
import assert from "node:assert/strict";

import { createDefaultThreatModel } from "../../dist/threat-model/threat-model.js";

test("default threat model exposes assets and trust boundaries", () => {
  const model = createDefaultThreatModel();

  assert.equal(model.assets().length, 2);
  assert.equal(model.boundaries().length, 3);
});

test("high-risk scenarios include mitigation ownership", () => {
  const model = createDefaultThreatModel();
  const highRisk = model.highRiskMitigations();

  assert.ok(highRisk.some((scenario) => scenario.mitigationOwner === "platform-security"));
  assert.ok(highRisk.every((scenario) => scenario.score >= 6));
});
