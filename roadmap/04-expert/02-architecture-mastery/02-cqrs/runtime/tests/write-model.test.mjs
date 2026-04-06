import test from "node:test";
import assert from "node:assert/strict";
import { OrderAggregate } from "../../dist/write-model/order-aggregate.js";

test("write model rejects non-positive totals", () => {
  assert.throws(
    () =>
      OrderAggregate.place({
        orderId: "ord_bad",
        customerId: "cus_bad",
        totalInCents: 0,
      }),
    /must be positive/,
  );
});

test("write model confirms a valid order", () => {
  const order = OrderAggregate.place({
    orderId: "ord_ok",
    customerId: "cus_ok",
    totalInCents: 5000,
  }).confirm();

  assert.equal(order.status, "confirmed");
});
