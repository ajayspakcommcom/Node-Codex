# AWS Basics Enterprise TypeScript Examples

These examples show how enterprise Node.js teams think about AWS building blocks, shared responsibility, workload fit, region and availability choices, IAM boundaries, cost and scaling tradeoffs, and operational visibility.

## Files

- `01-cloud-building-blocks.ts`
- `02-shared-responsibility-awareness.ts`
- `03-service-selection-basics.ts`
- `04-region-and-availability-awareness.ts`
- `05-iam-and-security-boundaries.ts`
- `06-cost-and-scaling-tradeoffs.ts`
- `07-operational-visibility-basics.ts`
- `08-managed-service-vs-self-managed-thinking.ts`
- `09-common-cloud-mistakes.ts`
- `10-maintainability-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/aws-types.ts`
- `shared/aws-runtime.ts`

## AWS Module

- `module/aws/service-selection-advisor.ts`
- `module/aws/shared-responsibility-advisor.ts`
- `module/aws/region-availability-advisor.ts`
- `module/aws/iam-boundary-advisor.ts`
- `module/aws/cost-scaling-advisor.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx -p tsx tsx roadmap/02-intermediate/08-cloud/01-aws-basics/code/01-cloud-building-blocks.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
