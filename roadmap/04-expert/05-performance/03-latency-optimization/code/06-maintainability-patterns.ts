export const maintainabilityPatterns = [
  "Measure p50, p95, and p99 together before recommending changes.",
  "Use explicit latency budgets for internal hops and dependencies.",
  "Prefer critical-path fixes over scattered local micro-optimizations.",
  "Document tradeoffs whenever latency improvements add complexity.",
] as const;
