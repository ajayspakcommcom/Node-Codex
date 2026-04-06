# Message Queues Code

This code set demonstrates enterprise-style queue usage patterns rather than SDK-specific boilerplate.

## Coverage

- broker selection tradeoffs
- producer contract discipline
- idempotent consumer behavior
- Kafka partition and consumer group concepts
- SQS visibility timeout and dead-letter queue behavior
- RabbitMQ exchange routing and acknowledgements
- retry and poison message handling
- backpressure and lag awareness
- schema versioning
- maintainability patterns

## Notes

- examples use small in-memory broker simulations to keep the focus on architecture
- the goal is to model production concerns, not vendor-specific setup steps
- these files are TypeScript examples and have not been wired to real Kafka, SQS, or RabbitMQ SDKs
