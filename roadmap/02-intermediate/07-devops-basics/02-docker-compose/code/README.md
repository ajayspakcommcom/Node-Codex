# Docker Compose Enterprise TypeScript Examples

These examples show how enterprise Node.js teams use Docker Compose to model local multi-service environments, coordinate configuration, reason about dependencies, manage volumes, and avoid common readiness and environment-drift mistakes.

## Files

- `01-app-plus-database-compose.ts`
- `02-app-plus-redis-compose.ts`
- `03-worker-service-compose.ts`
- `04-environment-variable-coordination.ts`
- `05-volume-and-reset-strategy.ts`
- `06-networking-basics.ts`
- `07-readiness-and-dependency-anti-patterns.ts`
- `08-local-workflow-standardization.ts`
- `09-common-compose-mistakes.ts`
- `10-maintainability-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/compose-types.ts`
- `shared/compose-runtime.ts`

## Compose Module

- `module/compose/compose-renderer.ts`
- `module/compose/dependency-advisor.ts`
- `module/compose/environment-coordination-advisor.ts`
- `module/compose/volume-strategy-advisor.ts`
- `module/compose/networking-advisor.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx -p tsx tsx roadmap/02-intermediate/07-devops-basics/02-docker-compose/code/01-app-plus-database-compose.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
