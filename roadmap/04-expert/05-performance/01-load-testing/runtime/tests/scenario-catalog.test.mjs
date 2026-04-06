import test from "node:test";
import assert from "node:assert/strict";

import { createScenarioCatalog } from "../../dist/load-test/scenario-catalog.js";

test("scenario catalog contains ramp and soak cases", () => {
  const scenarios = createScenarioCatalog().list();

  assert.equal(scenarios.length, 2);
  assert.ok(scenarios.some((scenario) => scenario.type === "soak"));
});
