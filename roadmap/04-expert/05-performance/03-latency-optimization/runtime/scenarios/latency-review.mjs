import { createDefaultCriticalPath } from "../../dist/latency/critical-path.js";
import { summarizeLatencyProfile } from "../../dist/latency/latency-profile.js";
import { validateLatencyBudget } from "../../dist/latency/latency-budget.js";
import { recommendOptimization } from "../../dist/latency/optimization-recommender.js";

const path = createDefaultCriticalPath();
const profile = summarizeLatencyProfile({
  p50Ms: 45,
  p95Ms: 180,
  p99Ms: 420,
});
const budget = validateLatencyBudget({
  totalBudgetMs: 250,
  segments: path.segments,
});
const recommendation = recommendOptimization({
  bottleneckType: "dependency",
  tailLatencyDominant: profile.tailLatencyConcern,
});

console.log(
  JSON.stringify({
    scenario: "latency-review",
    segmentCount: path.segments.length,
    withinBudget: budget.withinBudget,
    tailLatencyConcern: profile.tailLatencyConcern,
    recommendation: recommendation.recommendation,
  }),
);
