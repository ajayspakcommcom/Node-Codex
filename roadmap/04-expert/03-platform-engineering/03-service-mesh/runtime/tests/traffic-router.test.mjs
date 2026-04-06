import test from "node:test";
import assert from "node:assert/strict";

import { createWeightedTrafficRouter } from "../../dist/mesh/traffic-router.js";

test("weighted routing plan preserves requested stable and candidate percentages", () => {
  const router = createWeightedTrafficRouter({
    stableWeightPercent: 95,
    candidateWeightPercent: 5,
  });

  assert.deepEqual(router.plan(), {
    stableWeightPercent: 95,
    candidateWeightPercent: 5,
  });
});
