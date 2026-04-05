# Test Databases Enterprise TypeScript Examples

These examples show how enterprise Node.js teams keep database-backed tests realistic, isolated, repeatable, and maintainable through seeded fixtures, reset strategies, rollback sessions, schema initialization, and reproducible environment setup.

## Files

- `01-seeded-repository-tests.ts`
- `02-isolated-database-state.ts`
- `03-cleanup-strategy-reset-vs-truncate.ts`
- `04-in-memory-vs-real-database-tradeoffs.ts`
- `05-transaction-rollback-isolation.ts`
- `06-containerized-test-environment-awareness.ts`
- `07-schema-alignment-and-migrations.ts`
- `08-fixture-design-and-readability.ts`
- `09-shared-database-contamination-risk.ts`
- `10-maintainability-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/test-db-lite.ts`
- `shared/test-db-types.ts`
- `shared/test-db-runtime.ts`

## Test Database Module

- `module/db/test-database-harness.ts`
- `module/db/transaction-session.ts`
- `module/db/schema-manager.ts`
- `module/repositories/order-read-repository.ts`
- `module/repositories/audit-log-repository.ts`
- `module/fixtures/fixture-loader.ts`
- `module/advisors/environment-strategy-advisor.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx -p tsx tsx roadmap/02-intermediate/06-testing/03-test-databases/code/01-seeded-repository-tests.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
