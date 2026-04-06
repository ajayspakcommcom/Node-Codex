import test from "node:test";
import assert from "node:assert/strict";

import { validateRetryOwnership } from "../../dist/mesh/retry-policy.js";

test("single retry owner is valid", () => {
  assert.equal(
    validateRetryOwnership({
      meshRetriesEnabled: true,
      applicationRetriesEnabled: false,
    }),
    true,
  );
});

test("double retry ownership is rejected", () => {
  assert.throws(
    () =>
      validateRetryOwnership({
        meshRetriesEnabled: true,
        applicationRetriesEnabled: true,
      }),
    /cannot both be enabled/,
  );
});
