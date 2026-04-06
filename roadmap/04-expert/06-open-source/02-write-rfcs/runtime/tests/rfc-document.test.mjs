import test from "node:test";
import assert from "node:assert/strict";

import { createDefaultRfcDocument } from "../../dist/rfc/rfc-document.js";

test("default RFC document includes alternatives and migration planning", () => {
  const document = createDefaultRfcDocument();

  assert.ok(document.alternatives.length > 0);
  assert.ok(document.migrationPlan.length > 0);
});
