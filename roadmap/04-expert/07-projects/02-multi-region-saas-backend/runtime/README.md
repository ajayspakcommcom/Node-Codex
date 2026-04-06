# Runtime Validation

This runtime layer validates the package as a project artifact rather than a static topic example.

## Commands

- `npm run typecheck`
- `npm test`
- `npm run run:sample`

## Validation Scope

- tenant onboarding placement follows jurisdiction defaults
- routing respects strategy and healthy approved regions
- failover requires an approved and sufficiently caught-up secondary region
- rollout approval fails when replication or operator safeguards are missing
