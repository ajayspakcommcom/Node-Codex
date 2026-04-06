import { validateLatencyBudget } from "./latency/latency-budget.js";

console.log(
  validateLatencyBudget({
    totalBudgetMs: 250,
    segments: [
      { name: "gateway", latencyMs: 20 },
      { name: "catalog-service", latencyMs: 80 },
      { name: "search-service", latencyMs: 95 },
      { name: "serialization", latencyMs: 25 },
    ],
  }),
);
