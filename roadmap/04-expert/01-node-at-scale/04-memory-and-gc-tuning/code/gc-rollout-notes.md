# GC Rollout Notes

## Rollout Rules

- treat runtime-flag changes as versioned operational changes
- validate in a production-like environment before rollout
- compare `heapUsed`, `rss`, latency, and error rate before and after
- roll out to a limited slice of traffic before changing the full fleet

## Evidence Required

- before-and-after memory graphs
- GC-related latency observations
- clear explanation for why code-level fixes were insufficient or already applied
- rollback plan if memory or latency worsens
