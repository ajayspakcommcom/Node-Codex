# Backpressure Handling Enterprise TypeScript Examples

These examples show how senior Node.js engineers reason about bounded buffers, slow consumers, load shedding, queue growth, and backpressure signals across streams, APIs, queues, and sockets.

## Files

- `01-producer-vs-consumer-imbalance.ts`
- `02-bounded-buffer-strategy.ts`
- `03-unbounded-buffer-risk.ts`
- `04-slow-consumer-socket-awareness.ts`
- `05-load-shedding-under-pressure.ts`
- `06-queue-growth-as-overload-signal.ts`
- `07-retry-amplification-risk.ts`
- `08-cross-boundary-pressure-propagation.ts`
- `09-common-backpressure-mistakes.ts`
- `10-maintainability-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/backpressure-types.ts`
- `shared/backpressure-runtime.ts`

## Backpressure Module

- `module/analysis/buffer-pressure-analyzer.ts`
- `module/services/work-queue-service.ts`
- `module/services/socket-delivery-service.ts`
- `module/services/retry-policy-simulator.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx -p tsx tsx roadmap/03-senior/01-nodejs-internals/03-backpressure-handling/code/05-load-shedding-under-pressure.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
