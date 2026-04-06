# Runtime Validation

This runtime layer validates the built event-sourcing package instead of relying on a separate mock implementation.

## Included

- aggregate replay tests
- snapshot restore test
- projection rebuild test
- sample event-stream replay scenario

## Commands

```bash
npm run typecheck
npm test
npm run run:sample
```

## Intent

- make event replay and snapshot semantics executable
- validate that projections rebuild from the event stream
- keep operational tradeoffs visible through working code
