# Load Test Review Notes

## Review Sequence

1. Define the traffic mix, concurrency shape, and duration.
2. Include dependency-aware latency and error assumptions.
3. Compare p95, p99, and error rate to explicit SLO targets.
4. Identify whether the result is a capacity, dependency, or configuration problem.
5. Use release gates to block regressions before rollout.

## Rules

- realistic traffic mix matters more than a single headline RPS number
- percentile latency and error rate must be reviewed together
- release gates need explicit thresholds before the run starts
- soak behavior should be considered separately from short burst tests
