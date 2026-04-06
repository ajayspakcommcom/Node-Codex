# Pipeline Operations Notes

## Review Rules

- never increase queue depth without updating admission and lag policy
- dead-letter growth must produce ownership and recovery actions
- schema changes require compatibility review before producer rollout
- replay plans must document duplicate-safe behavior and side effects

## Failure Patterns

- sustained ingestion with no backpressure until memory growth becomes visible
- batching tuned for throughput but harmful to tail latency or retry cost
- dead-letter accumulation with no service owner assigned
- consumer lag normalized as steady state instead of incident signal

## Operability Expectations

- publish queue depth, lag, and dead-letter counts together
- define when replay is allowed and who approves it
- keep throughput and correctness tradeoffs explicit in design review
