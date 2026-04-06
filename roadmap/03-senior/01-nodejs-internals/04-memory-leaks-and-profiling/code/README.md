# Memory Leaks And Profiling Enterprise TypeScript Examples

These examples show how senior Node.js engineers reason about retained references, listener buildup, unbounded caches, request-scoped leaks, evidence-driven profiling, and distinguishing real leaks from legitimate growth.

## Files

- `01-leak-pattern-overview.ts`
- `02-unbounded-cache-growth.ts`
- `03-listener-retention-risk.ts`
- `04-request-scoped-data-leak.ts`
- `05-retained-reference-analysis.ts`
- `06-legitimate-growth-vs-leak.ts`
- `07-heap-snapshot-thinking.ts`
- `08-profiling-workflow-awareness.ts`
- `09-common-memory-mistakes.ts`
- `10-maintainability-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/memory-types.ts`
- `shared/memory-runtime.ts`

## Memory Analysis Module

- `module/analysis/retention-analyzer.ts`
- `module/analysis/profiling-advisor.ts`
- `module/services/cache-simulator.ts`
- `module/services/listener-registry.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx -p tsx tsx roadmap/03-senior/01-nodejs-internals/04-memory-leaks-and-profiling/code/02-unbounded-cache-growth.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
