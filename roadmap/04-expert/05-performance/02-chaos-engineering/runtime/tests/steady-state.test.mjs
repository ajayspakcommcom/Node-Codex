import test from "node:test";
import assert from "node:assert/strict";

import { evaluateSteadyState } from "../../dist/chaos/steady-state.js";

test("healthy steady state passes validation", () => {
  assert.equal(
    evaluateSteadyState({
      p95LatencyMs: 180,
      errorRatePercent: 0.4,
      maxP95LatencyMs: 250,
      maxErrorRatePercent: 1,
    }),
    true,
  );
});
