# Retries And Timeouts Code

This code set demonstrates enterprise-style timeout and retry patterns for distributed systems.

## Coverage

- connection vs request timeout awareness
- bounded retries
- retryable vs non-retryable errors
- exponential backoff with jitter
- cancellation and timeout propagation
- sync vs async retry policy differences
- retry storm awareness
- latency budget thinking
- interaction with idempotency and circuit breakers
- maintainability patterns

## Notes

- examples use small in-memory helpers to keep the focus on resilience logic
- the goal is to show safe retry behavior, not vendor-specific HTTP client setup
- retry policy should always be explicit per dependency
