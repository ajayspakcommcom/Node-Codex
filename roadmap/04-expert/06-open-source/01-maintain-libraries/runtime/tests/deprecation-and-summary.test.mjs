import test from "node:test";
import assert from "node:assert/strict";

import { createDefaultDeprecationRegistry } from "../../dist/library/deprecation-registry.js";
import { buildReleaseSummary } from "../../dist/library/release-summary.js";

test("deprecation registry exposes active notices", () => {
  const registry = createDefaultDeprecationRegistry();

  assert.equal(registry.active().length, 1);
});

test("release summary is ready when changelog entries exist", () => {
  const summary = buildReleaseSummary({
    version: "2.4.0",
    releaseType: "minor",
    changelogEntries: 3,
  });

  assert.equal(summary.readyForPublication, true);
});
