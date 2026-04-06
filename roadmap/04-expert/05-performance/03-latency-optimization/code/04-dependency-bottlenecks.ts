import { assessDependencyLatency } from "./latency/dependency-latency.js";

console.log(
  assessDependencyLatency({
    dependencyName: "search-service",
    p95LatencyMs: 120,
    budgetMs: 90,
  }),
);
