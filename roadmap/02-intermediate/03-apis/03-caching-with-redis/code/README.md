# Redis Caching Enterprise TypeScript Examples

These examples show how enterprise Node.js services use Redis-backed caching to improve read performance without hiding invalidation, TTL, fallback, and consistency tradeoffs.

## Files

- `01-cache-aside-read.ts`
- `02-ttl-strategy.ts`
- `03-invalidation-on-write.ts`
- `04-cache-key-design.ts`
- `05-response-caching-awareness.ts`
- `06-shared-temporary-state.ts`
- `07-cache-stampede-awareness.ts`
- `08-fallback-when-redis-is-unavailable.ts`
- `09-distributed-cache-across-instances.ts`
- `10-maintainability-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/cache-types.ts`
- `shared/cache-runtime.ts`

## Caching Module

- `module/controllers/product-controller.ts`
- `module/services/product-service.ts`
- `module/services/verification-code-service.ts`
- `module/repositories/product-repository.ts`
- `module/cache/product-cache.ts`
- `module/cache/temporary-state-cache.ts`
- `module/clients/redis-like-client.ts`
- `module/clients/failing-redis-client.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx -p tsx tsx roadmap/02-intermediate/03-apis/03-caching-with-redis/code/01-cache-aside-read.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
