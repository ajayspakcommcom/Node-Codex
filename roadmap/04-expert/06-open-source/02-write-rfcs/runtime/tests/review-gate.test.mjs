import test from "node:test";
import assert from "node:assert/strict";

import { createDefaultRfcDocument } from "../../dist/rfc/rfc-document.js";
import { reviewRfc } from "../../dist/rfc/review-gate.js";

test("complete RFC passes review gate", () => {
  const result = reviewRfc(createDefaultRfcDocument());

  assert.equal(result.approved, true);
});

test("RFC with missing alternatives is blocked", () => {
  const document = createDefaultRfcDocument();
  const result = reviewRfc({
    ...document,
    alternatives: [],
  });

  assert.equal(result.approved, false);
  assert.ok(result.blockingReasons.includes("alternatives and tradeoffs are required"));
});
