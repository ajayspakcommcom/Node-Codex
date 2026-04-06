import test from "node:test";
import assert from "node:assert/strict";

import { reviewFrameworkUpgrade } from "../../dist/framework/upgrade-policy.js";

test("framework upgrade passes when migration and compatibility requirements are met", () => {
  const result = reviewFrameworkUpgrade({
    currentVersion: "2.2.0",
    targetVersion: "2.3.0",
    hasMigrationGuide: true,
    compatibilityTestsPassing: true,
  });

  assert.equal(result.approved, true);
});

test("framework upgrade fails when migration guide is missing", () => {
  const result = reviewFrameworkUpgrade({
    currentVersion: "2.2.0",
    targetVersion: "2.3.0",
    hasMigrationGuide: false,
    compatibilityTestsPassing: true,
  });

  assert.equal(result.approved, false);
});
