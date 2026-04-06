import test from "node:test";
import assert from "node:assert/strict";

import { createDefaultCriticalPath } from "../../dist/latency/critical-path.js";
import { validateLatencyBudget } from "../../dist/latency/latency-budget.js";

test("critical path can be summarized against a total latency budget", () => {
  const path = createDefaultCriticalPath();
  const result = validateLatencyBudget({
    totalBudgetMs: 250,
    segments: path.segments,
  });

  assert.equal(result.withinBudget, true);
  assert.equal(result.totalObservedLatencyMs, 220);
});
