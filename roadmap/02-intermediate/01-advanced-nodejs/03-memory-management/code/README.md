# Memory Management Enterprise TypeScript Examples

These examples show how enterprise Node.js services detect memory growth, avoid common leak patterns, and keep in-memory behavior bounded.

## Files

- `01-process-memory-usage.ts`
- `02-unbounded-cache-mistake.ts`
- `03-bounded-cache.ts`
- `04-listener-leak-pattern.ts`
- `05-timer-cleanup-discipline.ts`
- `06-closure-retention.ts`
- `07-buffer-vs-stream-tradeoff.ts`
- `08-memory-growth-diagnostics.ts`
- `09-heap-snapshot-awareness.ts`
- `10-maintainability-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/memory-metrics.ts`
- `shared/bounded-cache.ts`

## Assets

- `assets/sample-payload.txt`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx tsx roadmap/02-intermediate/01-advanced-nodejs/03-memory-management/code/03-bounded-cache.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
