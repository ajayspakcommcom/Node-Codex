# Runtime Validation

This runtime layer validates the built multi-region package instead of a separate mock implementation.

## Included

- routing decision tests
- failover behavior tests
- residency-policy test
- sample failover simulation

## Commands

```bash
npm run typecheck
npm test
npm run run:sample
```

## Intent

- make region routing and failover rules executable
- validate that residency policy remains enforceable
- keep multi-region behavior reviewable with concrete examples
