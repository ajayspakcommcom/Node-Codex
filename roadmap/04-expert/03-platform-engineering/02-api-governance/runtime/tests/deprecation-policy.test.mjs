import test from "node:test";
import assert from "node:assert/strict";

import { validateDeprecationWindow } from "../../dist/governance/deprecation-policy.js";

test("valid deprecation window passes policy", () => {
  assert.equal(
    validateDeprecationWindow({
      announcedOn: "2026-04-01",
      removalOn: "2026-07-01",
      minimumDays: 60,
    }),
    true,
  );
});

test("too-short deprecation window is rejected", () => {
  assert.throws(
    () =>
      validateDeprecationWindow({
        announcedOn: "2026-04-01",
        removalOn: "2026-04-20",
        minimumDays: 60,
      }),
    /Deprecation window must be at least 60 days/,
  );
});
