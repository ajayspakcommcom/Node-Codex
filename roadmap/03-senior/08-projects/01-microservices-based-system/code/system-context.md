# System Context

- `api-gateway`: external entrypoint, auth boundary, request shaping
- `orders-service`: order workflow orchestration and event publication
- `inventory-service`: stock reservation ownership
- `payments-service`: payment authorization ownership
- shared contracts package defines cross-service API and event shapes
- shared observability package keeps logging schema consistent across services

