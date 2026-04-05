# Indexing Strategies Enterprise TypeScript Examples

These examples show how enterprise Node.js teams reason about indexes in terms of query shape, sort alignment, join support, write cost, and execution-plan evidence.

## Files

- `01-query-shape-and-index-fit.ts`
- `02-single-vs-composite-indexes.ts`
- `03-composite-index-column-order.ts`
- `04-filtering-and-sorting-alignment.ts`
- `05-join-key-indexing.ts`
- `06-selectivity-awareness.ts`
- `07-covering-index-awareness.ts`
- `08-over-indexing-risks.ts`
- `09-observability-and-query-plans.ts`
- `10-maintainability-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/indexing-types.ts`
- `shared/indexing-runtime.ts`

## Indexing Module

- `module/registry/index-registry.ts`
- `module/analyzers/query-analyzer.ts`
- `module/analyzers/write-cost-analyzer.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx -p tsx tsx roadmap/02-intermediate/04-databases/01-indexing-strategies/code/01-query-shape-and-index-fit.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
