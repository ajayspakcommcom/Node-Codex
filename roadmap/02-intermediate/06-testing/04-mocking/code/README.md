# Mocking Enterprise TypeScript Examples

These examples show how enterprise Node.js teams use fakes, stubs, mocks, and spies to isolate infrastructure boundaries, simulate failures, verify important interactions, and avoid brittle implementation-coupled tests.

## Files

- `01-fake-repository-example.ts`
- `02-payment-gateway-mock.ts`
- `03-notification-stub.ts`
- `04-failure-simulation-and-fallback.ts`
- `05-spy-based-interaction-check.ts`
- `06-where-mocking-belongs.ts`
- `07-over-mocking-anti-pattern.ts`
- `08-contract-drift-risk.ts`
- `09-common-mocking-mistakes.ts`
- `10-maintainability-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/mock-test-lite.ts`
- `shared/mocking-types.ts`
- `shared/mocking-runtime.ts`

## Mocking Module

- `module/services/checkout-service.ts`
- `module/services/invoice-delivery-service.ts`
- `module/doubles/fake-order-repository.ts`
- `module/doubles/mock-payment-gateway.ts`
- `module/doubles/stub-notifier.ts`
- `module/doubles/spy-audit-logger.ts`
- `module/advisors/mocking-boundary-advisor.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx -p tsx tsx roadmap/02-intermediate/06-testing/04-mocking/code/01-fake-repository-example.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
