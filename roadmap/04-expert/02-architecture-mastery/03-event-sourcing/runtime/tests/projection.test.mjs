import test from "node:test";
import assert from "node:assert/strict";
import { OrderProjectionBuilder } from "../../dist/projections/order-projection-builder.js";

test("projection builder rebuilds order summary from event stream", () => {
  const projection = new OrderProjectionBuilder().build([
    {
      type: "order-created",
      version: 1,
      payload: {
        orderId: "order-3",
        customerId: "customer-3",
        totalInCents: 7_500,
      },
    },
    {
      type: "order-confirmed",
      version: 1,
      payload: {
        orderId: "order-3",
      },
    },
  ]);

  assert.deepEqual(projection, {
    orderId: "order-3",
    customerId: "customer-3",
    totalInCents: 7_500,
    status: "confirmed",
  });
});
