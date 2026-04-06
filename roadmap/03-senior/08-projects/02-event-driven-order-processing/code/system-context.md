# System Context

- `orders-api` accepts command-style requests and publishes order creation commands
- `order-workflow` owns order lifecycle orchestration and event sequencing
- `inventory-consumer` and `payments-consumer` process order events idempotently
- `order-projection` builds a read model that is eventually consistent
- shared contracts package owns command and event schemas
- shared events package owns publishing and duplicate-handling primitives
- shared observability package keeps logging consistent across the platform
