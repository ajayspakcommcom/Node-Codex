import test from "node:test";
import assert from "node:assert/strict";

import { createDefaultContentDraft } from "../../dist/communication/content-draft.js";
import { validateStructure } from "../../dist/communication/structure-validator.js";
import { reviewForPublication } from "../../dist/communication/publication-gate.js";

test("default content draft has valid structure", () => {
  assert.equal(validateStructure(createDefaultContentDraft()), true);
});

test("default content draft passes publication gate", () => {
  const review = reviewForPublication(createDefaultContentDraft());

  assert.equal(review.approved, true);
});
