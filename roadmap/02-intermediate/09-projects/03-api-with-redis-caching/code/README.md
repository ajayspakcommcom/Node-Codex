# API With Redis Caching Enterprise TypeScript Project

These examples show how an enterprise-style API can use Redis caching in Node.js and TypeScript with cache-aside reads, tenant-safe cache keys, invalidation on write, fallback behavior, stampede protection, and cross-instance cache reuse.

## Files

- `01-api-project-architecture.ts`
- `02-cache-aside-product-read.ts`
- `03-catalog-response-caching.ts`
- `04-write-path-invalidation.ts`
- `05-cache-key-scope-and-tenancy.ts`
- `06-fallback-when-redis-is-unavailable.ts`
- `07-cache-stampede-protection.ts`
- `08-distributed-api-instances.ts`
- `09-common-caching-mistakes.ts`
- `10-maintainability-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/api-cache-types.ts`
- `shared/api-cache-runtime.ts`

## API Caching Module

- `module/bootstrap/api-platform.ts`
- `module/controllers/catalog-controller.ts`
- `module/clients/redis-like-client.ts`
- `module/clients/failing-redis-client.ts`
- `module/cache/catalog-cache.ts`
- `module/repositories/product-repository.ts`
- `module/services/catalog-service.ts`
- `module/services/cache-metrics-service.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx -p tsx tsx roadmap/02-intermediate/09-projects/03-api-with-redis-caching/code/02-cache-aside-product-read.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
