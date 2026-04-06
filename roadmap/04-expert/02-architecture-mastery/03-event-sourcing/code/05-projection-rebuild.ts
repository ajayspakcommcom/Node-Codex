import { OrderProjectionBuilder } from "./projections/order-projection-builder.js";
import { createLogger } from "./shared/logger.js";

const logger = createLogger("event-sourcing");
const projectionBuilder = new OrderProjectionBuilder();

const projection = projectionBuilder.build([
  {
    type: "order-created",
    version: 1,
    payload: {
      orderId: "order-103",
      customerId: "customer-103",
      totalInCents: 9_900,
    },
  },
  {
    type: "order-confirmed",
    version: 1,
    payload: {
      orderId: "order-103",
    },
  },
]);

logger.info("projection_rebuilt", {
  projection,
});
