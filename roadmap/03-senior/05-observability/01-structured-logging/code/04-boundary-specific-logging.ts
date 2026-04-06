import { createLogger } from "./shared/logger";

const logger = createLogger({
  service: "checkout-api",
  environment: "production",
  version: "2026.04.06",
});

logger.info("request_validated", {
  requestId: "req_777",
  boundary: "http",
});

logger.info("business_rule_applied", {
  requestId: "req_777",
  boundary: "service",
  rule: "coupon-validated",
});

logger.info("dependency_response_received", {
  requestId: "req_777",
  boundary: "repository",
  dependency: "pricing-db",
});
