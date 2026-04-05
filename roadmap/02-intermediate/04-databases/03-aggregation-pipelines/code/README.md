# Aggregation Pipelines Enterprise TypeScript Examples

These examples show how enterprise Node.js teams reason about aggregation pipelines in terms of stage ordering, fan-out, grouping cost, readability, observability, and when to materialize results instead of computing them live.

## Files

- `01-stage-by-stage-reporting-pipeline.ts`
- `02-early-filtering-and-projection.ts`
- `03-grouping-and-summarization.ts`
- `04-sorting-and-pagination-awareness.ts`
- `05-lookup-and-fanout-awareness.ts`
- `06-pipeline-cost-awareness.ts`
- `07-readability-with-named-stages.ts`
- `08-live-aggregation-vs-materialized-view.ts`
- `09-observability-and-explain-plan.ts`
- `10-maintainability-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/aggregation-types.ts`
- `shared/aggregation-runtime.ts`

## Aggregation Module

- `module/engine/pipeline-runner.ts`
- `module/pipelines/reporting-pipelines.ts`
- `module/advisors/materialization-advisor.ts`
- `module/services/reporting-service.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx -p tsx tsx roadmap/02-intermediate/04-databases/03-aggregation-pipelines/code/01-stage-by-stage-reporting-pipeline.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
