# Idempotency

## Purpose

Idempotency protects distributed systems from duplicated work when clients, brokers, or services retry the same operation after timeouts, crashes, or uncertain outcomes.

## Enterprise-Level Pointers

- what idempotency means in distributed systems
- why retries require idempotent behavior
- natural idempotency vs enforced idempotency
- idempotency for HTTP requests
- idempotency for asynchronous message consumers
- idempotency keys and request identity
- deduplication record storage patterns
- TTL strategy for idempotency records
- write-once and upsert-style workflows
- protecting external side effects from duplication
- handling duplicate message delivery safely
- race-condition awareness around duplicate processing
- response replay vs operation replay tradeoffs
- status tracking for in-progress vs completed requests
- exactly-once myths vs practical idempotency design
- observability for duplicate and replayed operations
- common production mistakes
- maintainability rules
- interview-style questions
- practice exercises

## What Enterprise Teams Optimize For

- safe retries without double charging, double creation, or duplicate side effects
- deterministic outcomes for repeated requests
- bounded deduplication storage and clear lifecycle rules
- simpler operational recovery during partial failures

## Common Production Mistakes

- treating retries as safe without proving idempotent behavior
- generating weak or non-unique idempotency keys
- checking deduplication too late after side effects already happened
- forgetting that message consumers also need idempotency
- assuming database uniqueness alone solves all duplicate-processing cases

## Maintainability Rules

- make retryable write paths explicitly idempotent
- store enough metadata to distinguish in-progress, completed, and failed operations
- keep deduplication logic close to the write boundary
- document which endpoints and consumers rely on idempotency guarantees
- test duplicate-delivery scenarios intentionally

## Interview Questions

- why is idempotency required when retries exist
- what is the difference between natural and enforced idempotency
- how would you design idempotency for message consumers
- why is exactly-once processing usually the wrong mental model
- what metadata should an idempotency store keep

## Practice Exercises

- design an idempotent payment API using an idempotency key
- model duplicate message handling for an order-fulfilled consumer
- compare response replay vs operation replay for the same workflow
- define TTL and cleanup strategy for an idempotency store
