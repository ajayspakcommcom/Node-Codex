# Unit Testing With Jest Enterprise TypeScript Examples

These examples show how enterprise Node.js teams use Jest-style unit tests to protect business logic, validation rules, authorization policy, clock-sensitive behavior, and failure handling without depending on full infrastructure setup.

## Files

- `01-business-rule-unit-tests.ts`
- `02-validation-edge-cases.ts`
- `03-authorization-policy-tests.ts`
- `04-controlled-clock-expiry-tests.ts`
- `05-fake-repository-tests.ts`
- `06-failure-path-and-fallback-tests.ts`
- `07-deterministic-id-generation.ts`
- `08-avoiding-over-mocking.ts`
- `09-common-unit-test-mistakes.ts`
- `10-maintainability-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/jest-lite.ts`
- `shared/testing-types.ts`
- `shared/testing-runtime.ts`

## Test Module

- `module/services/pricing-service.ts`
- `module/services/access-policy-service.ts`
- `module/services/order-application-service.ts`
- `module/services/subscription-renewal-service.ts`
- `module/validators/quote-request-validator.ts`
- `module/repositories/fake-order-repository.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx -p tsx tsx roadmap/02-intermediate/06-testing/01-unit-testing-jest/code/01-business-rule-unit-tests.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
