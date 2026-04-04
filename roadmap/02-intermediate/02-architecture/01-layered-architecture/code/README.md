# Layered Architecture Enterprise TypeScript Examples

These examples show how enterprise Node.js services keep transport, business, persistence, and infrastructure concerns separated.

## Files

- `01-request-flow-across-layers.ts`
- `02-thin-controller.ts`
- `03-service-layer-business-rules.ts`
- `04-repository-boundary.ts`
- `05-dto-and-boundary-contracts.ts`
- `06-avoiding-fat-controllers.ts`
- `07-infrastructure-boundary.ts`
- `08-dependency-direction.ts`
- `09-pragmatic-layering-vs-overengineering.ts`
- `10-maintainability-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/task-dto.ts`

## Layered Module

- `module/controllers/task-controller.ts`
- `module/services/task-service.ts`
- `module/repositories/task-repository.ts`
- `module/infrastructure/in-memory-task-store.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx tsx roadmap/02-intermediate/02-architecture/01-layered-architecture/code/01-request-flow-across-layers.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
