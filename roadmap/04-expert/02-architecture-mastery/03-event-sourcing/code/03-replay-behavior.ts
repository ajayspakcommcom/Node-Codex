import { OrderStream } from "./domain/order-stream.js";
import { createLogger } from "./shared/logger.js";

const logger = createLogger("event-sourcing");

const stream = OrderStream.replay([
  {
    type: "order-created",
    version: 1,
    payload: {
      orderId: "order-101",
      customerId: "customer-101",
      totalInCents: 8_500,
    },
  },
  {
    type: "order-confirmed",
    version: 1,
    payload: {
      orderId: "order-101",
    },
  },
]);

logger.info("event_replay_completed", {
  orderId: stream.orderId,
  status: stream.status,
  totalInCents: stream.totalInCents,
});
