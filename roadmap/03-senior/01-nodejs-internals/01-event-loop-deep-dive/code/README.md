# Event Loop Deep Dive Enterprise TypeScript Examples

These examples show how senior Node.js engineers reason about scheduling fairness, microtask behavior, event-loop lag, timer drift, blocking request paths, and cooperative yielding under production pressure.

## Files

- `01-event-loop-phase-overview.ts`
- `02-microtasks-vs-macrotasks.ts`
- `03-nexttick-starvation-risk.ts`
- `04-blocking-request-path-latency.ts`
- `05-event-loop-lag-monitoring.ts`
- `06-timer-drift-under-load.ts`
- `07-cooperative-yield-pattern.ts`
- `08-queue-consumer-fairness.ts`
- `09-common-event-loop-mistakes.ts`
- `10-maintainability-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/event-loop-types.ts`
- `shared/event-loop-runtime.ts`

## Event Loop Module

- `module/analysis/event-loop-lag-monitor.ts`
- `module/analysis/scheduling-analyzer.ts`
- `module/services/request-path-simulator.ts`
- `module/services/fairness-service.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx -p tsx tsx roadmap/03-senior/01-nodejs-internals/01-event-loop-deep-dive/code/05-event-loop-lag-monitoring.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
