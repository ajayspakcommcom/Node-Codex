# Libuv Enterprise TypeScript Examples

These examples show how senior Node.js engineers reason about libuv responsibilities, worker-pool contention, filesystem and DNS behavior, and how asynchronous runtime delegation affects service latency.

## Files

- `01-libuv-runtime-overview.ts`
- `02-thread-pool-contention.ts`
- `03-filesystem-worker-pool-awareness.ts`
- `04-dns-lookup-awareness.ts`
- `05-crypto-thread-pool-contention.ts`
- `06-io-vs-cpu-bound-distinction.ts`
- `07-latency-sensitive-vs-background-work.ts`
- `08-worker-pool-sizing-awareness.ts`
- `09-common-libuv-mistakes.ts`
- `10-maintainability-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/libuv-types.ts`
- `shared/libuv-runtime.ts`

## Libuv Module

- `module/analysis/thread-pool-contention-analyzer.ts`
- `module/analysis/filesystem-workload-analyzer.ts`
- `module/analysis/lookup-analyzer.ts`
- `module/services/runtime-separation-service.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx -p tsx tsx roadmap/03-senior/01-nodejs-internals/02-libuv/code/02-thread-pool-contention.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
