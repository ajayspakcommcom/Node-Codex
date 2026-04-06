import test from "node:test";
import assert from "node:assert/strict";

import { evaluateFrameworkReleaseGate } from "../../dist/framework/release-gate.js";

test("framework release gate passes when all publication criteria are met", () => {
  const result = evaluateFrameworkReleaseGate({
    hasChangelog: true,
    hasMigrationGuide: true,
    compatibilityTestsPassing: true,
    adoptingServiceValidationPassing: true,
  });

  assert.equal(result.approved, true);
});

test("framework release gate blocks missing adopting service validation", () => {
  const result = evaluateFrameworkReleaseGate({
    hasChangelog: true,
    hasMigrationGuide: true,
    compatibilityTestsPassing: true,
    adoptingServiceValidationPassing: false,
  });

  assert.equal(result.approved, false);
  assert.ok(result.blockingReasons.includes("adopting service validation must pass before framework release"));
});
