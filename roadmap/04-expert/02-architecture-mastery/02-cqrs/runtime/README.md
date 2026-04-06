# Runtime Validation

This runtime layer validates the built CQRS package instead of a parallel mock implementation.

## Included

- write-model invariant tests
- command-handler orchestration test
- projection update test
- sample order flow using the compiled CQRS slice

## Commands

```bash
npm run typecheck
npm test
npm run run:sample
```

## Intent

- keep read/write separation executable
- validate projection behavior after compile
- make CQRS tradeoffs reviewable with working code
