# System Context

- `framework`: platform-owned bootstrap, config policy, plugin catalog, and release rules
- `apps/orders-api`: adopting service using the framework with service-specific routes
- framework defaults cover health, tracing, structured logging, graceful shutdown, and exposure-based runtime policy
- service teams can add extensions, but platform safety controls remain mandatory
- framework upgrades require compatibility review and migration guidance before publication
