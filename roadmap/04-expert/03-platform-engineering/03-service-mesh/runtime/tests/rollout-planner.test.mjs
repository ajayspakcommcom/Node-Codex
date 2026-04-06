import test from "node:test";
import assert from "node:assert/strict";

import { createRolloutPlanner } from "../../dist/mesh/rollout-planner.js";

test("rollout planner provides progressive traffic stages", () => {
  const planner = createRolloutPlanner();
  const steps = planner.stepsFor("checkout-service");

  assert.deepEqual(steps, [
    "baseline policy for checkout-service",
    "10 percent candidate traffic for checkout-service",
    "50 percent candidate traffic for checkout-service",
    "100 percent candidate traffic for checkout-service",
  ]);
});
