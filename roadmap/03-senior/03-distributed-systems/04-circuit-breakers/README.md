# Circuit Breakers

## Purpose

Circuit breakers stop repeated calls to failing dependencies so one unhealthy service does not drag the rest of the system into broad latency and error amplification.

## Enterprise-Level Pointers

- what circuit breakers solve in distributed systems
- dependency failure amplification
- closed, open, and half-open states
- failure threshold strategy
- recovery window strategy
- latency-based vs error-based tripping awareness
- dependency isolation and bulkhead awareness
- fallback behavior awareness
- degraded-mode response strategy
- protecting thread pools, worker pools, and connection pools
- observability for breaker state transitions
- alerting on repeated breaker trips
- tuning sensitivity without flapping
- combining circuit breakers with retries and timeouts correctly
- avoiding hidden failures behind bad fallbacks
- common production mistakes
- maintainability rules
- interview-style questions
- practice exercises

## What Enterprise Teams Optimize For

- fast failure instead of slow failure amplification
- graceful degradation when dependencies are unhealthy
- predictable recovery behavior
- visibility into dependency health and protection mechanisms

## Common Production Mistakes

- adding retries before breakers and multiplying failure load
- using circuit breakers without meaningful timeout strategy
- hiding serious outages behind misleading fallback responses
- tripping too aggressively and causing unnecessary service degradation
- failing to monitor breaker state transitions

## Maintainability Rules

- place circuit breakers around unstable or high-latency dependencies
- keep breaker configuration explicit and observable
- design fallback paths intentionally, not as silent data corruption
- tune thresholds using production behavior, not guesswork
- review breaker settings whenever dependency latency or traffic patterns change

## Interview Questions

- when should a circuit breaker open
- what is the difference between timeouts, retries, and circuit breakers
- why is half-open state necessary
- what makes a fallback dangerous
- how do you prevent breaker flapping

## Practice Exercises

- design a breaker around a flaky payment gateway
- choose thresholds and recovery windows for a high-latency dependency
- compare a good fallback vs a misleading fallback
- define the metrics and alerts for a circuit breaker protecting an external API
