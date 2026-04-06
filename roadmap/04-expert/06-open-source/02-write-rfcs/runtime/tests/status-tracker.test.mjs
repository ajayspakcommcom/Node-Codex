import test from "node:test";
import assert from "node:assert/strict";

import { createDefaultRfcStatus } from "../../dist/rfc/status-tracker.js";

test("default RFC status is approved and linked to implementation", () => {
  const status = createDefaultRfcStatus();

  assert.equal(status.state, "approved");
  assert.equal(status.implementationLinked, true);
});
