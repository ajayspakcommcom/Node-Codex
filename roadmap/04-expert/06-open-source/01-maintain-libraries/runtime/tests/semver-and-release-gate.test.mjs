import test from "node:test";
import assert from "node:assert/strict";

import { classifyReleaseImpact } from "../../dist/library/semver-policy.js";
import { evaluateReleaseGate } from "../../dist/library/release-gate.js";

test("added API is classified as a minor release", () => {
  assert.equal(
    classifyReleaseImpact({
      apiRemoved: false,
      apiAdded: true,
      bugFixOnly: false,
    }),
    "minor",
  );
});

test("release gate blocks missing migration guide for consumer-visible change", () => {
  const result = evaluateReleaseGate({
    releaseType: "minor",
    hasChangelog: true,
    hasMigrationGuide: false,
    testsPassing: true,
  });

  assert.equal(result.approved, false);
  assert.ok(result.blockingReasons.includes("migration guidance is required for consumer-visible changes"));
});
