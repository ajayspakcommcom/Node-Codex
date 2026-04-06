import { OrderProjectionStore } from "./read-model/order-projection-store.js";
import { OrderProjectionUpdater } from "./projections/order-projection-updater.js";
import { createLogger } from "./shared/logger.js";

const logger = createLogger("cqrs");
const projectionStore = new OrderProjectionStore();
const updater = new OrderProjectionUpdater(projectionStore);

updater.apply({
  eventType: "order.confirmed",
  orderId: "ord_1003",
  customerId: "cus_1003",
  totalInCents: 15_000,
});

logger.info("projection_updater_example", {
  projection: projectionStore.findById("ord_1003"),
});
