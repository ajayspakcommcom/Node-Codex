# FinOps Guardrail Notes

## Review Sequence

1. Attribute cost to a service, team, and environment.
2. Compare current usage to budget policy and unit-cost expectations.
3. Detect anomalies and identify likely workload causes.
4. Recommend guardrails for obviously wasteful resource patterns.
5. Balance spend reductions with reliability and latency risk.

## Rules

- every material cost center needs a clear service or platform owner
- budgets should trigger action, not only reports
- anomaly review must point to workload behavior, not just totals
- guardrails should prevent wasteful defaults without blocking justified exceptions
