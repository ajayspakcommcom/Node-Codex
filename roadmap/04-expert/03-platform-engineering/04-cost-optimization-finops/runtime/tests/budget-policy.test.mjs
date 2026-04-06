import test from "node:test";
import assert from "node:assert/strict";

import { createDefaultBudgetPolicy } from "../../dist/finops/budget-policy.js";

test("service within budget passes evaluation", () => {
  const policy = createDefaultBudgetPolicy();
  const result = policy.evaluate({
    serviceName: "catalog-api",
    monthlyCostUsd: 8200,
  });

  assert.equal(result.withinBudget, true);
  assert.equal(result.budgetUsd, 8500);
});

test("service above budget fails evaluation", () => {
  const policy = createDefaultBudgetPolicy();
  const result = policy.evaluate({
    serviceName: "catalog-api",
    monthlyCostUsd: 9200,
  });

  assert.equal(result.withinBudget, false);
});
