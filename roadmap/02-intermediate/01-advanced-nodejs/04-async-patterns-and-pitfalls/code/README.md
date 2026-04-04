# Async Patterns And Pitfalls Enterprise TypeScript Examples

These examples show how enterprise Node.js services make async workflows predictable, bounded, and observable.

## Files

- `01-error-propagation-and-unhandled-rejection.ts`
- `02-sequential-vs-parallel.ts`
- `03-controlled-concurrency.ts`
- `04-promise-all-vs-allsettled.ts`
- `05-timeout-and-cancellation.ts`
- `06-retry-basics.ts`
- `07-async-foreach-pitfall.ts`
- `08-fire-and-forget-risks.ts`
- `09-race-conditions-and-shared-state.ts`
- `10-batching-and-throttling.ts`
- `11-maintainability-patterns.ts`
- `12-interview-questions.ts`
- `13-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/async-helpers.ts`
- `shared/fake-clients.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx tsx roadmap/02-intermediate/01-advanced-nodejs/04-async-patterns-and-pitfalls/code/03-controlled-concurrency.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
