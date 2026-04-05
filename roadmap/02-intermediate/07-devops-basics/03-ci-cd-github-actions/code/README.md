# CI/CD With GitHub Actions Enterprise TypeScript Examples

These examples show how enterprise Node.js teams think about workflow stages, quality gates, build artifacts, branch triggers, environment separation, secret handling, and deployment guardrails when designing GitHub Actions pipelines.

## Files

- `01-basic-workflow-structure.ts`
- `02-lint-and-test-jobs.ts`
- `03-build-artifact-awareness.ts`
- `04-branch-and-trigger-strategy.ts`
- `05-environment-separation.ts`
- `06-secret-handling-awareness.ts`
- `07-deployment-guardrails.ts`
- `08-local-and-ci-alignment.ts`
- `09-common-ci-cd-mistakes.ts`
- `10-maintainability-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/cicd-types.ts`
- `shared/cicd-runtime.ts`

## CI/CD Module

- `module/workflow/workflow-renderer.ts`
- `module/workflow/quality-gate-advisor.ts`
- `module/workflow/secrets-advisor.ts`
- `module/workflow/environment-separation-advisor.ts`
- `module/workflow/deployment-guardrail-advisor.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx -p tsx tsx roadmap/02-intermediate/07-devops-basics/03-ci-cd-github-actions/code/01-basic-workflow-structure.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
