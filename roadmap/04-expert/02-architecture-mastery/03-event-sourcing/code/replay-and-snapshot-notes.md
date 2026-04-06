# Replay And Snapshot Notes

## Replay Rules

- the event stream is the source of truth
- projections are rebuildable views
- replay cost grows with stream size and projection complexity
- replay behavior should be tested before relying on it during incidents

## Snapshot Rules

- snapshots are an optimization, not a replacement for the event stream
- snapshot cadence should be explicit and workload-driven
- snapshot format changes need versioning discipline
- aggregate reconstruction must be possible from snapshot plus later events
