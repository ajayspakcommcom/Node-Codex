# Event Loop Enterprise TypeScript Examples

These examples focus on how scheduling and blocking behavior affect real Node.js backend services.

## Files

- `01-call-stack-and-sync-order.ts`
- `02-promises-and-microtasks.ts`
- `03-nexttick-setimmediate-and-timers.ts`
- `04-blocking-event-loop.ts`
- `05-async-io-simulation.ts`
- `06-safer-request-handler-pattern.ts`
- `07-backpressure-awareness.ts`
- `08-debugging-execution-order.ts`
- `09-common-production-mistakes.ts`
- `10-enterprise-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/runtime.ts`
- `shared/timing.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx tsx roadmap/01-beginner/03-event-loop-call-stack-and-microtasks/code/01-call-stack-and-sync-order.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
