# Horizontal Scaling Enterprise TypeScript Examples

These examples show how senior backend engineers reason about stateless replicas, shared-state hazards, duplicate work, downstream bottlenecks, autoscaling signals, and scaling tradeoffs under production pressure.

## Files

- `01-stateless-replica-baseline.ts`
- `02-in-memory-session-breakage.ts`
- `03-shared-cache-and-state-externalization.ts`
- `04-database-bottleneck-under-replica-growth.ts`
- `05-duplicate-worker-execution-risk.ts`
- `06-idempotency-and-replica-safety.ts`
- `07-autoscaling-signal-discipline.ts`
- `08-scaling-vs-optimization-tradeoff.ts`
- `09-common-horizontal-scaling-mistakes.ts`
- `10-maintainability-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/horizontal-scaling-types.ts`
- `shared/horizontal-scaling-runtime.ts`

## Horizontal Scaling Module

- `module/analysis/scaling-bottleneck-analyzer.ts`
- `module/analysis/autoscaling-signal-analyzer.ts`
- `module/services/replica-routing-service.ts`
- `module/services/shared-state-service.ts`
- `module/services/duplicate-work-service.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx -p tsx tsx roadmap/03-senior/02-system-design/04-horizontal-scaling/code/04-database-bottleneck-under-replica-growth.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
