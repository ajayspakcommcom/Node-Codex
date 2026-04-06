import test from "node:test";
import assert from "node:assert/strict";

import { createDefaultTrafficProfile } from "../../dist/load-test/traffic-profile.js";

test("default traffic profile totals 100 percent", () => {
  const profile = createDefaultTrafficProfile();
  const total = profile.slices.reduce((sum, slice) => sum + slice.percentage, 0);

  assert.equal(total, 100);
});
