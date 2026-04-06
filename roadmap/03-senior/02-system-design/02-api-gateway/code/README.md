# API Gateway Enterprise TypeScript Examples

These examples show how senior backend engineers reason about edge routing, authentication, rate limits, aggregation, downstream protection, and gateway bottlenecks in large-scale architectures.

## Files

- `01-edge-routing-baseline.ts`
- `02-edge-authentication-and-policy.ts`
- `03-rate-limiting-at-the-edge.ts`
- `04-request-aggregation-tradeoff.ts`
- `05-downstream-protection-and-shedding.ts`
- `06-gateway-vs-service-authorization-boundary.ts`
- `07-central-bottleneck-risk.ts`
- `08-platform-ownership-model.ts`
- `09-common-gateway-mistakes.ts`
- `10-maintainability-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/gateway-types.ts`
- `shared/gateway-runtime.ts`

## Gateway Module

- `module/analysis/gateway-bottleneck-analyzer.ts`
- `module/services/edge-auth-service.ts`
- `module/services/gateway-policy-service.ts`
- `module/services/rate-limit-service.ts`
- `module/services/request-aggregation-service.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx -p tsx tsx roadmap/03-senior/02-system-design/02-api-gateway/code/04-request-aggregation-tradeoff.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
