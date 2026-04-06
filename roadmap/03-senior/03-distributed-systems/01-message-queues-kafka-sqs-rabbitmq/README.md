# Message Queues (Kafka / SQS / RabbitMQ)

## Purpose

Message queues let services communicate asynchronously, smooth traffic spikes, isolate failures, and move slow or unreliable work out of request paths.

## Enterprise-Level Pointers

- why enterprise teams use queues instead of direct synchronous calls
- asynchronous decoupling between producers and consumers
- queue vs pub/sub vs event stream awareness
- Kafka vs SQS vs RabbitMQ tradeoffs at a practical architecture level
- producer responsibilities and delivery guarantees
- consumer responsibilities and safe message handling
- at-least-once delivery awareness
- duplicate delivery and out-of-order delivery awareness
- partitioning, routing, and ordering tradeoffs
- consumer groups and competing consumer patterns
- acknowledgement, visibility timeout, and offset management awareness
- dead-letter queues and poison message handling
- retry strategy for failed message processing
- backpressure, queue depth, and consumer lag awareness
- idempotent consumer design
- schema and payload contract discipline
- large payload avoidance and message size discipline
- observability for producers, consumers, lag, and failure rates
- security and access control for queue infrastructure
- common production mistakes
- maintainability rules
- interview-style questions
- practice exercises

## Kafka In Enterprise Systems

- high-throughput event streaming and durable log use cases
- partition-based scaling and ordering tradeoffs
- consumer groups and replay capability
- offset management and reprocessing discipline
- event retention and backfill workflows
- schema registry and contract evolution awareness
- using Kafka when event history and stream processing matter

## SQS In Enterprise Systems

- managed queueing for simpler operational ownership
- standard vs FIFO queue tradeoffs
- visibility timeout and redelivery awareness
- dead-letter queue usage and retry boundaries
- queue-per-workflow simplicity for operational teams
- using SQS when operational simplicity matters more than stream features

## RabbitMQ In Enterprise Systems

- broker-based routing patterns with exchanges and bindings
- direct, topic, and fanout routing awareness
- explicit acknowledgement behavior
- per-queue operational tuning and routing flexibility
- using RabbitMQ when routing patterns and broker flexibility matter

## How Enterprise Teams Choose Between Them

- choose Kafka when you need replay, high-throughput streams, retention, and event history
- choose SQS when you want managed queue infrastructure and simpler operational overhead
- choose RabbitMQ when you need rich routing semantics and explicit broker-side messaging patterns

## What Enterprise Teams Optimize For

- resilient async communication under partial failure
- bounded queue growth and predictable consumer throughput
- safe replay and reprocessing behavior
- clear ownership of message contracts and topic or queue boundaries

## Common Production Mistakes

- assuming messages are delivered exactly once
- putting too much business logic into the queueing layer
- publishing unstable payload shapes without versioning discipline
- ignoring dead-letter queues until incidents happen
- retrying poison messages forever
- depending on ordering guarantees that the platform does not actually provide

## Maintainability Rules

- keep message contracts explicit and version-aware
- make consumers idempotent by design
- isolate producer and consumer logic behind clear service boundaries
- monitor lag, failure rate, retry rate, and dead-letter volume
- document why a queue exists and what failure semantics it relies on

## Interview Questions

- when would you choose Kafka instead of SQS or RabbitMQ
- why are idempotent consumers required in queue-based systems
- how do dead-letter queues help operational stability
- what problems do consumer lag and backpressure expose
- why should message contracts be version-aware

## Practice Exercises

- design a payment-processing workflow using a queue and dead-letter queue
- compare how you would model the same workflow in Kafka, SQS, and RabbitMQ
- design an idempotent consumer for order-created events
- define the metrics you would monitor for one producer and one consumer service
