import { createLogger } from "./shared/logger";

const logger = createLogger({
  service: "orders-api",
  environment: "production",
  version: "2026.04.06",
});

logger.info("dependency_call_started", {
  requestId: "req_301",
  traceId: "trace_901",
  spanId: "span_10",
  dependency: "inventory-service",
});
