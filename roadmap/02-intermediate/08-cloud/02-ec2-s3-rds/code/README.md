# EC2, S3, And RDS Enterprise TypeScript Examples

These examples show how enterprise Node.js teams reason about EC2, S3, and RDS responsibilities, workload fit, compute and storage boundaries, durability expectations, and cost or scaling tradeoffs.

## Files

- `01-ec2-workload-fit.ts`
- `02-s3-file-storage-boundary.ts`
- `03-rds-managed-relational-fit.ts`
- `04-compute-vs-storage-separation.ts`
- `05-durability-and-availability-awareness.ts`
- `06-cost-and-scaling-tradeoffs.ts`
- `07-service-misuse-anti-patterns.ts`
- `08-combined-architecture-example.ts`
- `09-common-ec2-s3-rds-mistakes.ts`
- `10-maintainability-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/aws-service-types.ts`
- `shared/aws-service-runtime.ts`

## Service Module

- `module/aws/compute-fit-advisor.ts`
- `module/aws/storage-boundary-advisor.ts`
- `module/aws/database-fit-advisor.ts`
- `module/aws/durability-advisor.ts`
- `module/aws/cost-risk-advisor.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx -p tsx tsx roadmap/02-intermediate/08-cloud/02-ec2-s3-rds/code/01-ec2-workload-fit.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
