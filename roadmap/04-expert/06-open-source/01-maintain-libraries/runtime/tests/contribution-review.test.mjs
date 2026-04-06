import test from "node:test";
import assert from "node:assert/strict";

import { reviewContribution } from "../../dist/library/contribution-review.js";

test("well-formed contribution passes review", () => {
  const result = reviewContribution({
    testsIncluded: true,
    compatibilityReviewed: true,
    supportScopeClear: true,
  });

  assert.equal(result.accepted, true);
});

test("missing compatibility review is blocked", () => {
  const result = reviewContribution({
    testsIncluded: true,
    compatibilityReviewed: false,
    supportScopeClear: true,
  });

  assert.equal(result.accepted, false);
});
