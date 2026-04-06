# Runtime Validation

This runtime layer makes the topic executable instead of only descriptive.

## Included

- bounded-cache and unbounded-retention scenarios
- transient allocation scenario
- Node tests for cache and retention boundaries
- memory-usage reporting scripts
- optional `--expose-gc` helpers for more repeatable local investigation

## Commands

```bash
npm test
npm run typecheck
npm run run:cache
npm run run:allocation
npm run run:retention
```

## Intent

- compare bounded and unbounded state behavior with the same workload shape
- show memory-report structure teams can use during investigation
- keep validation simple enough to run locally and in CI
