# Domain-Driven Design Code

This code set demonstrates an enterprise-style DDD slice with explicit bounded contexts and ownership boundaries.

## Coverage

- bounded context separation
- value objects and entities
- aggregate-root invariant enforcement
- application service orchestration
- repository boundary
- anti-corruption layer for a foreign billing model
- context-mapping notes
- maintainability-oriented domain boundaries

## Notes

- this is a design-quality domain model example, not a full production system
- files are intentionally organized by context and layer to show where DDD boundaries belong
- the goal is to model how enterprise teams keep domain rules separate from transport, persistence, and foreign models
