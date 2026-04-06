# Monolith Vs Microservices Enterprise TypeScript Examples

These examples show how senior backend engineers reason about modular monoliths, service-boundary extraction, operational overhead, data consistency, ownership alignment, and distributed complexity under real production pressure.

## Files

- `01-modular-monolith-baseline.ts`
- `02-service-extraction-pressure.ts`
- `03-boundary-by-domain-not-layer.ts`
- `04-synchronous-call-chain-risk.ts`
- `05-data-consistency-tradeoff.ts`
- `06-team-ownership-alignment.ts`
- `07-independent-scaling-justification.ts`
- `08-operational-overhead-comparison.ts`
- `09-common-architecture-mistakes.ts`
- `10-maintainability-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/architecture-types.ts`
- `shared/architecture-runtime.ts`

## Architecture Module

- `module/analysis/boundary-analyzer.ts`
- `module/analysis/coupling-analyzer.ts`
- `module/services/modular-monolith-service.ts`
- `module/services/distributed-architecture-service.ts`
- `module/services/extraction-advisor.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx -p tsx tsx roadmap/03-senior/02-system-design/01-monolith-vs-microservices/code/04-synchronous-call-chain-risk.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
