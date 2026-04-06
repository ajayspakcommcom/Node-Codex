# Latency Review Notes

## Review Sequence

1. Break the request into critical-path segments.
2. Compare p50, p95, and p99 rather than only average or median latency.
3. Validate each segment against an explicit latency budget.
4. Identify whether the bottleneck is local compute, serialization, network, or dependency latency.
5. Recommend the highest-leverage optimization that preserves maintainability.

## Rules

- optimize the highest-leverage boundary first
- tail latency matters more than median latency for operational risk
- latency budgets should exist for internal hops and dependencies
- every non-obvious optimization needs a tradeoff explanation
