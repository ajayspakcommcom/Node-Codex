# Integration Tests Enterprise TypeScript Examples

These examples show how enterprise Node.js teams use integration tests to verify request handling, auth middleware, validation, persistence, transactions, and controlled infrastructure boundaries without turning every test into a slow end-to-end suite.

## Files

- `01-controller-service-repository-integration.ts`
- `02-auth-middleware-protected-route.ts`
- `03-validation-and-serialization-contract.ts`
- `04-repository-and-database-integration.ts`
- `05-transaction-workflow-integration.ts`
- `06-external-dependency-boundary-control.ts`
- `07-stable-fixtures-and-test-isolation.ts`
- `08-failure-path-without-event-leakage.ts`
- `09-module-boundary-vs-full-stack-choice.ts`
- `10-maintainability-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/integration-test-lite.ts`
- `shared/integration-types.ts`
- `shared/integration-runtime.ts`

## Integration Module

- `module/db/in-memory-database.ts`
- `module/repositories/order-repository.ts`
- `module/services/authentication-service.ts`
- `module/services/order-service.ts`
- `module/services/order-event-service.ts`
- `module/http/application.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx -p tsx tsx roadmap/02-intermediate/06-testing/02-integration-tests/code/01-controller-service-repository-integration.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
