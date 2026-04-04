import { createLogger } from "@packages/logger";
import { createOrderResponse } from "@packages/order-contracts";
import { readSharedConfig } from "@packages/shared-config";

const config = readSharedConfig();
const logger = createLogger("api");

logger.info("Starting API package", {
  environment: config.environment,
});

console.log(
  createOrderResponse({
    id: "order_1",
    customerId: "customer_1",
    totalInCents: 5000,
  }),
);
