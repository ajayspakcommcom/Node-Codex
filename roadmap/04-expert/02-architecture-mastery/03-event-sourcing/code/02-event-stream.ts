import { InMemoryEventStore } from "./store/in-memory-event-store.js";
import { createLogger } from "./shared/logger.js";

const logger = createLogger("event-sourcing");
const store = new InMemoryEventStore();

store.append("order-100", [
  {
    type: "order-created",
    version: 1,
    payload: {
      orderId: "order-100",
      customerId: "customer-100",
      totalInCents: 12_000,
    },
  },
]);

logger.info("event_stream_appended", {
  eventCount: store.load("order-100").length,
});
