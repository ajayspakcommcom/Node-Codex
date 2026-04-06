# Event-Driven Order Processing Code

This code set demonstrates an enterprise-style event-driven order-processing workspace.

## Coverage

- command API boundary for order creation
- event contract package
- in-memory event bus abstraction
- idempotent consumer behavior
- order projection for eventual consistency
- payment and inventory workflow consumers
- dead-letter and retry policy notes
- shared observability utilities
- local multi-service workspace layout
- maintainability-oriented boundaries

## Notes

- this is a design-quality project skeleton, not a full production deployment
- files are intentionally organized to show workflow ownership and async boundaries
- the goal is to model how an enterprise event-driven order system is structured
