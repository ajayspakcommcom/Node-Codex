import { InMemoryEventStore } from "../../dist/store/in-memory-event-store.js";
import { OrderStream } from "../../dist/domain/order-stream.js";
import { OrderProjectionBuilder } from "../../dist/projections/order-projection-builder.js";

const store = new InMemoryEventStore();

const createdOrder = OrderStream.create("order-sample", "customer-sample", 22_000).confirm();
store.append("order-sample", createdOrder.pendingEvents);

const rehydrated = OrderStream.replay(store.load("order-sample"));
const projection = new OrderProjectionBuilder().build(store.load("order-sample"));

console.log(
  JSON.stringify({
    scenario: "replay-order-stream",
    eventCount: store.load("order-sample").length,
    status: rehydrated.status,
    projection,
  }),
);
