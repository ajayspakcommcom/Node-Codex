# Runtime Validation

This runtime layer exists so throughput patterns can be exercised locally instead of only described in notes.

## Included

- admission-control simulation
- bounded-concurrency scenario
- batching scenario
- Node tests for limiter behavior
- CI validation example

## Commands

```bash
npm test
npm run typecheck
npm run run:overload
npm run run:batching
```

## Intent

- demonstrate controlled rejection under overload
- show concurrency limits protecting a simulated dependency
- keep throughput controls reviewable and repeatable
