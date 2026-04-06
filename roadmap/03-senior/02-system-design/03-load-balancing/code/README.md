# Load Balancing Enterprise TypeScript Examples

These examples show how senior backend engineers reason about traffic distribution, balancing algorithms, health checks, failover, sticky sessions, zonal resilience, and observability under production pressure.

## Files

- `01-round-robin-baseline.ts`
- `02-weighted-distribution-awareness.ts`
- `03-least-loaded-routing.ts`
- `04-health-check-and-failover.ts`
- `05-sticky-session-tradeoff.ts`
- `06-zonal-distribution-awareness.ts`
- `07-uneven-workload-hotspot-risk.ts`
- `08-balancer-observability-signals.ts`
- `09-common-load-balancing-mistakes.ts`
- `10-maintainability-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/load-balancing-types.ts`
- `shared/load-balancing-runtime.ts`

## Load Balancing Module

- `module/analysis/distribution-analyzer.ts`
- `module/analysis/failover-analyzer.ts`
- `module/services/health-check-service.ts`
- `module/services/load-balancer-service.ts`
- `module/services/session-affinity-service.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx -p tsx tsx roadmap/03-senior/02-system-design/03-load-balancing/code/04-health-check-and-failover.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
