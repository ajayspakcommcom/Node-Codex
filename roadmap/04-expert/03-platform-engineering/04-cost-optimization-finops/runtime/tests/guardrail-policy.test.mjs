import test from "node:test";
import assert from "node:assert/strict";

import { createDefaultGuardrailPolicy } from "../../dist/finops/guardrail-policy.js";
import { calculateUnitCost } from "../../dist/finops/unit-economics.js";

test("guardrail policy recommends actions for wasteful defaults", () => {
  const policy = createDefaultGuardrailPolicy();
  const result = policy.review({
    serviceName: "analytics-batch",
    idleNodeCount: 5,
    hasStorageLifecyclePolicy: false,
  });

  assert.deepEqual(result.recommendations, [
    "reduce idle node count for analytics-batch",
    "add storage lifecycle policy for analytics-batch",
  ]);
});

test("unit cost can be calculated for workload volume", () => {
  const unitCost = calculateUnitCost({
    monthlyCostUsd: 12400,
    monthlyRequestCount: 6200000,
  });

  assert.equal(unitCost, 0.002);
});
