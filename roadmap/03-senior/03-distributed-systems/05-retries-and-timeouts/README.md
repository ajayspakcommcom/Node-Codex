# Retries And Timeouts

## Purpose

Retries and timeouts are core resilience controls in distributed systems. They prevent indefinite waiting, bound latency, and improve recovery from transient dependency failures when used carefully.

## Enterprise-Level Pointers

- why every network call needs an explicit timeout
- connection timeout vs request timeout awareness
- end-to-end latency budget awareness
- where timeouts should exist in request chains
- bounded retry strategy
- retryable vs non-retryable failures
- exponential backoff awareness
- jitter awareness
- retries for synchronous calls vs asynchronous consumers
- retry storms and dependency overload risks
- timeout propagation across layered services
- cancellation and abort signal awareness
- interaction between retries, timeouts, and idempotency
- interaction between retries and circuit breakers
- partial failure and uncertain outcome handling
- observability for timeout rate, retry rate, and dependency latency
- common production mistakes
- maintainability rules
- interview-style questions
- practice exercises

## What Enterprise Teams Optimize For

- bounded latency under dependency instability
- recovery from transient failures without overload amplification
- explicit failure semantics instead of hanging requests
- clear retry policy per dependency and workflow

## Common Production Mistakes

- leaving default infinite or overly long timeouts
- retrying every failure the same way
- retrying non-idempotent writes without safeguards
- stacking retries at multiple layers until load explodes
- using backoff without jitter and creating synchronized retry spikes

## Maintainability Rules

- define explicit timeout and retry policy per dependency
- keep retry counts bounded and backoff visible in code
- combine retries with idempotency and circuit breakers deliberately
- propagate timeout and cancellation context across layers
- monitor timeout, retry, and saturation metrics continuously

## Interview Questions

- why should every dependency call have an explicit timeout
- what failures are safe to retry and what failures are not
- why is jitter important in retry logic
- how do retries interact with idempotency and circuit breakers
- what causes retry storms in distributed systems

## Practice Exercises

- design retry and timeout policy for a payment gateway call
- compare retry policy for a read request vs a write request
- define where timeout budgets should exist in a three-service request chain
- design observability for timeout rate, retry rate, and dependency latency
