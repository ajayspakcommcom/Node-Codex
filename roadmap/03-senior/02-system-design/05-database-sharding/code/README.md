# Database Sharding Enterprise TypeScript Examples

These examples show how senior backend engineers reason about shard-key design, shard-aware routing, hotspot risk, cross-shard coordination, rebalancing, and operational tradeoffs under production pressure.

## Files

- `01-why-sharding-is-not-the-first-answer.ts`
- `02-shard-key-comparison.ts`
- `03-shard-aware-routing.ts`
- `04-hotspot-and-skew-risk.ts`
- `05-cross-shard-query-cost.ts`
- `06-cross-shard-transaction-risk.ts`
- `07-rebalancing-and-data-movement.ts`
- `08-tenant-vs-time-based-partitioning.ts`
- `09-common-sharding-mistakes.ts`
- `10-maintainability-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/sharding-types.ts`
- `shared/sharding-runtime.ts`

## Sharding Module

- `module/analysis/hotspot-analyzer.ts`
- `module/analysis/shard-key-analyzer.ts`
- `module/services/cross-shard-cost-service.ts`
- `module/services/rebalancing-service.ts`
- `module/services/shard-router.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx -p tsx tsx roadmap/03-senior/02-system-design/05-database-sharding/code/04-hotspot-and-skew-risk.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
