# System Context

- `public-api`: external entrypoint, cache usage, rate limiting, request shedding
- `catalog-service`: core product-feed ownership and dependency protection
- `search-indexer`: async refresh and reindex workflow outside the user request path
- shared contracts package defines public and internal feed shapes
- shared observability package keeps logging schema consistent across services
- shared performance controls package standardizes rate limiting and concurrency guards
