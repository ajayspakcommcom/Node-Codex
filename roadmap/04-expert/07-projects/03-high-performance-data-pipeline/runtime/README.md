# Runtime Validation

This runtime layer validates the package as a project artifact instead of a static topic sketch.

## Commands

- `npm run typecheck`
- `npm test`
- `npm run run:sample`

## Validation Scope

- ingestion applies bounded admission under queue and worker limits
- batching respects in-flight constraints
- delivery outcomes choose retry vs dead-letter correctly
- schema changes are reviewed for backward and replay compatibility
- pipeline health summarizes lag, queue pressure, and dead-letter risk
