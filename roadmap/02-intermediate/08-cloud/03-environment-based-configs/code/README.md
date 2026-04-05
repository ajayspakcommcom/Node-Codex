# Environment-Based Configs Enterprise TypeScript Examples

These examples show how enterprise Node.js teams design environment-based configuration, validate required values at startup, separate code from config, handle secrets safely, and reduce drift across local, staging, and production environments.

## Files

- `01-config-loading-basics.ts`
- `02-startup-validation.ts`
- `03-environment-separation.ts`
- `04-secret-handling-awareness.ts`
- `05-code-vs-config-boundary.ts`
- `06-config-drift-risk.ts`
- `07-deployment-safety.ts`
- `08-local-staging-production-comparison.ts`
- `09-common-config-mistakes.ts`
- `10-maintainability-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/config-types.ts`
- `shared/config-runtime.ts`

## Config Module

- `module/config/config-loader.ts`
- `module/config/config-validator.ts`
- `module/config/secret-handling-advisor.ts`
- `module/config/environment-drift-advisor.ts`
- `module/config/deployment-safety-advisor.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx -p tsx tsx roadmap/02-intermediate/08-cloud/03-environment-based-configs/code/01-config-loading-basics.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
