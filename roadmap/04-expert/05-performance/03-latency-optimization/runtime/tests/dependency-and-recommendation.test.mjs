import test from "node:test";
import assert from "node:assert/strict";

import { assessDependencyLatency } from "../../dist/latency/dependency-latency.js";
import { recommendOptimization } from "../../dist/latency/optimization-recommender.js";

test("dependency over budget is flagged", () => {
  const result = assessDependencyLatency({
    dependencyName: "search-service",
    p95LatencyMs: 120,
    budgetMs: 90,
  });

  assert.equal(result.overBudget, true);
});

test("dependency tail latency returns a dependency-focused recommendation", () => {
  const recommendation = recommendOptimization({
    bottleneckType: "dependency",
    tailLatencyDominant: true,
  });

  assert.ok(recommendation.recommendation.includes("dependency tail latency"));
});
