# Cluster And Worker Threads Enterprise TypeScript Examples

These examples show how enterprise Node.js services protect the event loop, offload CPU-heavy work, and distinguish process scaling from worker-thread compute isolation.

## Files

- `01-blocking-main-thread.ts`
- `02-worker-thread-offload.ts`
- `03-cluster-basics.ts`
- `04-cluster-vs-worker-choice.ts`
- `05-message-passing-and-structured-clone.ts`
- `06-timeout-and-termination.ts`
- `07-worker-error-handling.ts`
- `08-shared-memory-awareness.ts`
- `09-maintainability-patterns.ts`
- `10-interview-questions.ts`
- `11-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/cpu-tasks.ts`

## Worker Files

- `workers/cpu-worker.ts`
- `workers/message-worker.ts`
- `workers/error-worker.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx tsx roadmap/02-intermediate/01-advanced-nodejs/02-cluster-and-worker-threads/code/02-worker-thread-offload.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
