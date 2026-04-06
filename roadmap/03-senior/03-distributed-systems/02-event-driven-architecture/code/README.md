# Event-Driven Architecture Code

This code set models enterprise event-driven patterns with a small in-memory event bus.

## Coverage

- events vs commands
- domain events vs integration events
- choreography vs orchestration
- eventual consistency
- idempotent handlers
- replay and reprocessing awareness
- event contract ownership
- traceability and observability
- hidden RPC anti-patterns
- maintainability patterns

## Notes

- examples use an in-memory bus so the focus stays on architecture and contracts
- files show production-style boundaries rather than vendor-specific broker setup
- the goal is to make async workflows explicit and debuggable
