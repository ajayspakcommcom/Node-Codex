import test from "node:test";
import assert from "node:assert/strict";
import { OrderStream } from "../../dist/domain/order-stream.js";

test("event-sourced aggregate rejects invalid create command", () => {
  assert.throws(() => OrderStream.create("order-bad", "customer-bad", 0), /must be positive/);
});

test("event replay reconstructs confirmed order state", () => {
  const order = OrderStream.replay([
    {
      type: "order-created",
      version: 1,
      payload: {
        orderId: "order-1",
        customerId: "customer-1",
        totalInCents: 12_000,
      },
    },
    {
      type: "order-confirmed",
      version: 1,
      payload: {
        orderId: "order-1",
      },
    },
  ]);

  assert.equal(order.status, "confirmed");
  assert.equal(order.totalInCents, 12_000);
});
