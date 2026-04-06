# Performance Tuning Enterprise TypeScript Examples

These examples show how senior Node.js engineers reason about bottlenecks, tail latency, CPU vs dependency cost, realistic benchmarks, and evidence-driven optimization tradeoffs.

## Files

- `01-bottleneck-identification-overview.ts`
- `02-cpu-vs-dependency-bottleneck.ts`
- `03-latency-vs-throughput-tradeoff.ts`
- `04-tail-latency-awareness.ts`
- `05-realistic-benchmark-discipline.ts`
- `06-request-path-cost-breakdown.ts`
- `07-scaling-vs-optimization-decision.ts`
- `08-optimization-tradeoff-review.ts`
- `09-common-performance-mistakes.ts`
- `10-maintainability-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/performance-types.ts`
- `shared/performance-runtime.ts`

## Performance Module

- `module/analysis/bottleneck-analyzer.ts`
- `module/analysis/benchmark-analyzer.ts`
- `module/services/request-path-profiler.ts`
- `module/services/workload-simulator.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx -p tsx tsx roadmap/03-senior/01-nodejs-internals/05-performance-tuning/code/04-tail-latency-awareness.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
