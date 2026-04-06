import { createLogger } from "@platform/observability/logger";

const logger = createLogger("payments-service");

logger.info("payments_service_ready", {
  servicePort: process.env.PAYMENTS_SERVICE_PORT ?? "4300",
  ownership: "payments capability owns authorization, capture, and payment risk rules",
});
