# Docker Enterprise TypeScript Examples

These examples show how enterprise Node.js teams think about Dockerfile structure, layer strategy, `.dockerignore`, runtime configuration, multi-stage builds, reproducible builds, and image-size or security tradeoffs.

## Files

- `01-basic-dockerfile-structure.ts`
- `02-layer-order-and-caching.ts`
- `03-dockerignore-awareness.ts`
- `04-runtime-environment-configuration.ts`
- `05-multi-stage-build-awareness.ts`
- `06-build-reproducibility.ts`
- `07-image-size-and-security-anti-patterns.ts`
- `08-local-and-ci-consistency.ts`
- `09-common-docker-mistakes.ts`
- `10-maintainability-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/docker-types.ts`
- `shared/docker-runtime.ts`

## Docker Module

- `module/build/dockerfile-renderer.ts`
- `module/build/layer-strategy-advisor.ts`
- `module/build/dockerignore-advisor.ts`
- `module/build/runtime-config-advisor.ts`
- `module/build/image-risk-advisor.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx -p tsx tsx roadmap/02-intermediate/07-devops-basics/01-docker/code/01-basic-dockerfile-structure.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
