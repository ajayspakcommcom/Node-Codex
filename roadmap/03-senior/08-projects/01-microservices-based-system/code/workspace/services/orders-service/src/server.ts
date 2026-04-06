import { createLogger } from "@platform/observability/logger";
import { createOrder } from "./application/create-order";

const logger = createLogger("orders-service");

const inventoryServiceUrl = process.env.INVENTORY_SERVICE_URL ?? "http://inventory-service:4200";
const paymentsServiceUrl = process.env.PAYMENTS_SERVICE_URL ?? "http://payments-service:4300";

void createOrder(
  {
    customerId: "cus_100",
    items: [{ sku: "sku_1", quantity: 2 }],
    paymentMethodId: "pm_10",
  },
  {
    inventoryServiceUrl,
    paymentsServiceUrl,
  },
).then(({ response, event }) => {
  logger.info("order_created", {
    orderId: response.orderId,
    status: response.status,
  });

  logger.info("order_created_event_ready_for_publish", {
    eventName: event.eventName,
    orderId: event.payload.orderId,
  });
});
