import { type CreateOrderCommand } from "@platform/contracts/order-command";
import { createLogger } from "@platform/observability/logger";
import { publishCommand } from "@platform/events/command-publisher";

const logger = createLogger("orders-api");

const command: CreateOrderCommand = {
  customerId: "cus_201",
  items: [{ sku: "sku_11", quantity: 1 }],
  paymentMethodId: "pm_55",
  idempotencyKey: "idem_order_201",
};

void publishCommand("order.create", command).then(() => {
  logger.info("order_command_published", {
    customerId: command.customerId,
    idempotencyKey: command.idempotencyKey,
  });
});
