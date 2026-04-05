# Transactions Enterprise TypeScript Examples

These examples show how enterprise Node.js teams use transactions to protect business invariants, keep boundaries small, handle rollback correctly, and keep external side effects outside the database transaction.

## Files

- `01-atomic-order-placement.ts`
- `02-rollback-on-failure.ts`
- `03-transaction-boundary-design.ts`
- `04-isolation-and-lock-awareness.ts`
- `05-deadlock-and-retry-awareness.ts`
- `06-service-layer-transaction-orchestration.ts`
- `07-long-transaction-risks.ts`
- `08-where-transactions-should-stop.ts`
- `09-outbox-pattern-awareness.ts`
- `10-maintainability-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/transaction-types.ts`
- `shared/transaction-runtime.ts`

## Transaction Module

- `module/db/in-memory-transaction-manager.ts`
- `module/repositories/account-repository.ts`
- `module/repositories/inventory-repository.ts`
- `module/repositories/order-repository.ts`
- `module/repositories/outbox-repository.ts`
- `module/services/fund-transfer-service.ts`
- `module/services/order-placement-service.ts`
- `module/services/outbox-dispatcher.ts`
- `module/advisors/transaction-boundary-advisor.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx -p tsx tsx roadmap/02-intermediate/04-databases/02-transactions/code/01-atomic-order-placement.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
