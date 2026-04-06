# Event Sourcing Code

This code set demonstrates an enterprise-style event-sourced aggregate with snapshots and projection rebuild behavior.

## Coverage

- event-sourced aggregate
- immutable event stream
- replay behavior
- snapshot creation and restore
- projection rebuild
- event version awareness
- maintainability-oriented event-store boundaries

## Notes

- this is a design-quality event-sourcing package with local validation support
- files are intentionally organized around the event stream, aggregate logic, and projection rebuild workflow
- the goal is to model why event sourcing is powerful and why it must be treated as an operationally heavy choice
