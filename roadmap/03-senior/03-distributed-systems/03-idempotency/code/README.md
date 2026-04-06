# Idempotency Code

This code set demonstrates enterprise-style idempotency patterns for APIs and asynchronous consumers.

## Coverage

- natural vs enforced idempotency
- HTTP idempotency keys
- message-consumer deduplication
- in-progress vs completed request states
- response replay
- side-effect protection
- race-condition awareness
- TTL and cleanup awareness
- exactly-once myth vs practical design
- maintainability patterns

## Notes

- examples use in-memory stores to focus on architecture and workflow safety
- the goal is to model duplicate-safe behavior, not framework-specific wiring
- these examples show where idempotency belongs in production flows
