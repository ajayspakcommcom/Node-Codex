import { InMemoryOrderCommandRepository } from "../../dist/write-model/in-memory-order-command-repository.js";
import { PlaceOrderHandler } from "../../dist/write-model/place-order-handler.js";
import { OrderProjectionStore } from "../../dist/read-model/order-projection-store.js";
import { OrderProjectionUpdater } from "../../dist/projections/order-projection-updater.js";

const repository = new InMemoryOrderCommandRepository();
const handler = new PlaceOrderHandler(repository);
const projectionStore = new OrderProjectionStore();
const projectionUpdater = new OrderProjectionUpdater(projectionStore);

const order = handler.execute({
  orderId: "ord_sample",
  customerId: "cus_sample",
  totalInCents: 18_500,
});

projectionUpdater.apply({
  eventType: "order.confirmed",
  orderId: order.orderId,
  customerId: order.customerId,
  totalInCents: order.totalInCents,
});

console.log(
  JSON.stringify({
    scenario: "cqrs-order-flow",
    writeModelStatus: order.status,
    readModel: projectionStore.findById(order.orderId),
  }),
);
