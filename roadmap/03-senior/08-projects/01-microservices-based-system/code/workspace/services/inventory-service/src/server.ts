import { createLogger } from "@platform/observability/logger";

const logger = createLogger("inventory-service");

logger.info("inventory_service_ready", {
  servicePort: process.env.INVENTORY_SERVICE_PORT ?? "4200",
  ownership: "inventory capability owns reservation rules and stock records",
});
