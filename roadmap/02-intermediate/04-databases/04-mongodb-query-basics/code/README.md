# MongoDB Query Basics Enterprise TypeScript Examples

These examples show how enterprise Node.js teams reason about MongoDB query shape, field projection, sorting and pagination, update operators, validation, and when simple queries are better than aggregation.

## Files

- `01-find-and-filter-basics.ts`
- `02-projection-discipline.ts`
- `03-sorting-and-pagination-awareness.ts`
- `04-update-operators-for-partial-state.ts`
- `05-readable-query-object-patterns.ts`
- `06-parameter-validation-and-input-safety.ts`
- `07-query-shape-and-index-alignment.ts`
- `08-simple-query-vs-aggregation-decision.ts`
- `09-skip-pagination-risk.ts`
- `10-maintainability-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/mongo-types.ts`
- `shared/mongo-runtime.ts`

## Mongo Query Module

- `module/engine/in-memory-mongo-collection.ts`
- `module/repositories/order-read-repository.ts`
- `module/validators/query-parameter-validator.ts`
- `module/advisors/query-shape-advisor.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx -p tsx tsx roadmap/02-intermediate/04-databases/04-mongodb-query-basics/code/01-find-and-filter-basics.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
