import { createLogger } from "./shared/logger";

const logger = createLogger({
  service: "billing-api",
  environment: "production",
  version: "2026.04.06",
});

logger.info("request_received", {
  route: "/payments",
  method: "POST",
  requestId: "req_1001",
});
