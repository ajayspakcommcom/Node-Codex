# API Versioning Enterprise TypeScript Examples

These examples show how enterprise Node.js services evolve API contracts without cloning the whole business layer for each version.

## Files

- `01-uri-versioning.ts`
- `02-header-versioning.ts`
- `03-breaking-vs-additive-changes.ts`
- `04-version-routing-and-contract-boundaries.ts`
- `05-deprecation-and-sunset-signals.ts`
- `06-consumer-migration-adapter.ts`
- `07-avoiding-duplicated-business-logic.ts`
- `08-observability-by-version.ts`
- `09-common-versioning-mistakes.ts`
- `10-maintainability-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/order-contracts.ts`
- `shared/versioning-runtime.ts`

## Versioned Module

- `module/controllers/order-controller.ts`
- `module/infrastructure/in-memory-order-store.ts`
- `module/presenters/order-contract-mapper.ts`
- `module/services/order-service.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx tsx roadmap/02-intermediate/03-apis/01-api-versioning/code/01-uri-versioning.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
