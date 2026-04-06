import test from "node:test";
import assert from "node:assert/strict";

import { validateEvidenceQuality } from "../../dist/communication/evidence-review.js";
import { reviewConfidentiality } from "../../dist/communication/confidentiality-check.js";

test("evidence review passes for concrete, measured operational content", () => {
  assert.equal(
    validateEvidenceQuality({
      hasMetrics: true,
      hasConcreteExample: true,
      hasOperationalLesson: true,
    }),
    true,
  );
});

test("confidentiality review fails if customer names are present", () => {
  assert.equal(
    reviewConfidentiality({
      containsCustomerNames: true,
      containsInternalSystemNames: false,
      hasBeenGeneralized: false,
    }),
    false,
  );
});
