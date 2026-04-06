# Event-Driven Order Processing

## Purpose

This project should model an order lifecycle built on events, queues, idempotent handlers, and eventual consistency so engineers can reason about distributed workflows under failure and retry conditions.

## Enterprise-Level Pointers

- order lifecycle decomposition into services and event flows
- command vs event separation
- queue or stream selection for workflow stages
- idempotent consumers and duplicate handling
- retry, timeout, and dead-letter strategy
- eventual consistency in order state projections
- observability for async workflow tracing
- saga or orchestration awareness where applicable
- rollback and compensating action awareness
- contract versioning for event payloads
- metrics and alerting for queue depth, lag, and failure rate
- common production mistakes
- maintainability rules
- interview-style questions
- practice exercises

## What Enterprise Teams Optimize For

- reliable order progression under partial failure
- clear async workflow visibility
- safe retries and duplicate tolerance
- bounded operational complexity around events and consumers

## Common Production Mistakes

- using events without explicit ownership or schema discipline
- failing to design for duplicates, replays, and out-of-order events
- mixing business workflow logic across too many hidden consumers
- treating eventual consistency as an implementation detail instead of a product behavior

## Maintainability Rules

- model order transitions and failure handling explicitly
- keep event contracts versioned and owned
- make consumer behavior idempotent and observable
- document where consistency is immediate and where it is eventual
