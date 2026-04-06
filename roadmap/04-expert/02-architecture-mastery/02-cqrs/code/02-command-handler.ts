import { InMemoryOrderCommandRepository } from "./write-model/in-memory-order-command-repository.js";
import { PlaceOrderHandler } from "./write-model/place-order-handler.js";
import { createLogger } from "./shared/logger.js";

const logger = createLogger("cqrs");

const handler = new PlaceOrderHandler(new InMemoryOrderCommandRepository());

const order = handler.execute({
  orderId: "ord_1001",
  customerId: "cus_1001",
  totalInCents: 12_500,
});

logger.info("command_handler_example", {
  orderId: order.orderId,
  status: order.status,
});
