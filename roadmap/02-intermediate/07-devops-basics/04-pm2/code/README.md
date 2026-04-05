# PM2 Enterprise TypeScript Examples

These examples show how enterprise Node.js teams think about PM2 ecosystem configuration, restart behavior, cluster-mode tradeoffs, environment-specific process settings, logging visibility, and deployment-fit decisions for server-based runtimes.

## Files

- `01-ecosystem-config-basics.ts`
- `02-process-supervision-awareness.ts`
- `03-restart-policy-tradeoffs.ts`
- `04-cluster-mode-awareness.ts`
- `05-environment-specific-config.ts`
- `06-logging-and-runtime-visibility.ts`
- `07-pm2-fit-vs-misfit.ts`
- `08-pm2-vs-broader-orchestration.ts`
- `09-common-pm2-mistakes.ts`
- `10-maintainability-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/pm2-types.ts`
- `shared/pm2-runtime.ts`

## PM2 Module

- `module/pm2/ecosystem-renderer.ts`
- `module/pm2/restart-policy-advisor.ts`
- `module/pm2/cluster-mode-advisor.ts`
- `module/pm2/runtime-visibility-advisor.ts`
- `module/pm2/deployment-fit-advisor.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx -p tsx tsx roadmap/02-intermediate/07-devops-basics/04-pm2/code/01-ecosystem-config-basics.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
