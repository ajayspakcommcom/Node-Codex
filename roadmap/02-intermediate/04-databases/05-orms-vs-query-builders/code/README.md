# ORMs Vs Query Builders Enterprise TypeScript Examples

These examples show how enterprise Node.js teams compare ORM-style and query-builder-style data access in terms of repository boundaries, generated query visibility, workload fit, performance tuning, and mixed-approach architecture.

## Files

- `01-orm-style-crud-workflow.ts`
- `02-query-builder-style-reporting-read.ts`
- `03-generated-query-awareness.ts`
- `04-repository-boundary-comparison.ts`
- `05-performance-sensitive-read-path.ts`
- `06-migrations-and-schema-evolution-awareness.ts`
- `07-testing-and-mockability.ts`
- `08-mixed-approach-architecture.ts`
- `09-persistence-leakage-anti-pattern.ts`
- `10-maintainability-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/data-access-types.ts`
- `shared/data-access-runtime.ts`

## Comparison Module

- `module/orm/order-entity-model.ts`
- `module/orm/order-orm-repository.ts`
- `module/query-builder/order-query-builder.ts`
- `module/query-builder/order-query-builder-repository.ts`
- `module/inspection/query-inspector.ts`
- `module/advisors/abstraction-fit-advisor.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx -p tsx tsx roadmap/02-intermediate/04-databases/05-orms-vs-query-builders/code/01-orm-style-crud-workflow.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
