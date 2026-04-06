# Circuit Breakers Code

This code set demonstrates enterprise-style circuit breaker patterns around unstable dependencies.

## Coverage

- breaker states: closed, open, half-open
- failure thresholds
- recovery windows
- timeout and retry coordination awareness
- degraded-mode fallback patterns
- bulkhead awareness
- state-transition observability
- bad fallback anti-patterns
- maintainability patterns

## Notes

- examples use in-memory simulation so the focus stays on resilience logic
- the goal is to show where breaker behavior belongs in service code
- these examples model the architecture, not a specific resilience library
