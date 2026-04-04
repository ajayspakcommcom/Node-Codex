# Service Vs Controller Separation Enterprise TypeScript Examples

These examples show how enterprise Node.js services keep transport concerns in controllers and business workflows in services.

## Files

- `01-controller-vs-service-flow.ts`
- `02-thin-controller.ts`
- `03-service-owned-business-rules.ts`
- `04-no-database-access-in-controller.ts`
- `05-no-http-objects-in-service.ts`
- `06-dto-and-input-boundaries.ts`
- `07-error-handling-responsibilities.ts`
- `08-fat-controller-anti-pattern.ts`
- `09-service-dump-anti-pattern.ts`
- `10-maintainability-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/order-dto.ts`

## Example Module

- `module/controllers/order-controller.ts`
- `module/services/order-service.ts`
- `module/repositories/order-repository.ts`
- `module/infrastructure/in-memory-order-store.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx tsx roadmap/02-intermediate/02-architecture/02-service-vs-controller-separation/code/01-controller-vs-service-flow.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
