import test from "node:test";
import assert from "node:assert/strict";
import { OrderProjectionStore } from "../../dist/read-model/order-projection-store.js";
import { OrderProjectionUpdater } from "../../dist/projections/order-projection-updater.js";

test("projection updater creates a query-optimized record", () => {
  const store = new OrderProjectionStore();
  const updater = new OrderProjectionUpdater(store);

  updater.apply({
    eventType: "order.confirmed",
    orderId: "ord_proj",
    customerId: "cus_proj",
    totalInCents: 9_500,
  });

  assert.deepEqual(store.findById("ord_proj"), {
    orderId: "ord_proj",
    customerId: "cus_proj",
    totalInCents: 9_500,
    status: "confirmed",
  });
});
