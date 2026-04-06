# System Context

- `framework-core`: platform-owned bootstrap and plugin orchestration
- `observability`: shared logging contract for framework and adopters
- `catalog-api`: example product-team service using the framework
- framework enforces validated config, default middleware-style plugins, health endpoints, and structured startup behavior
- services can add service-specific plugins and routes without forking the framework
