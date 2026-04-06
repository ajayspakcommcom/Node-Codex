import { OrderProjectionStore } from "./read-model/order-projection-store.js";
import { createLogger } from "./shared/logger.js";

const logger = createLogger("cqrs");
const store = new OrderProjectionStore();

store.upsert({
  orderId: "ord_1002",
  customerId: "cus_1002",
  totalInCents: 8_000,
  status: "confirmed",
});

logger.info("read_projection_example", {
  projection: store.findById("ord_1002"),
});
