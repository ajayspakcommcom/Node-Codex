# Rate Limiting Enterprise TypeScript Examples

These examples show how enterprise Node.js services apply rate limiting as a transport protection policy without hiding fairness rules, distributed tradeoffs, or failure behavior.

## Files

- `01-fixed-window-in-memory.ts`
- `02-route-specific-policies.ts`
- `03-per-identity-keys.ts`
- `04-distributed-counter-awareness.ts`
- `05-rate-limit-headers-and-429.ts`
- `06-fail-open-vs-fail-closed.ts`
- `07-login-endpoint-protection.ts`
- `08-observability-and-metrics.ts`
- `09-unfair-shared-ip-risk.ts`
- `10-maintainability-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/rate-limit-types.ts`
- `shared/rate-limit-runtime.ts`

## Rate-Limiting Module

- `module/controllers/api-gateway-controller.ts`
- `module/policies/policy-registry.ts`
- `module/services/rate-limiter-service.ts`
- `module/stores/in-memory-counter-store.ts`
- `module/stores/redis-like-counter-store.ts`
- `module/stores/failing-counter-store.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx -p tsx tsx roadmap/02-intermediate/03-apis/02-rate-limiting/code/01-fixed-window-in-memory.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
