import test from "node:test";
import assert from "node:assert/strict";
import { Order } from "../../dist/contexts/orders/domain/order.js";

test("order aggregate rejects placement without items", () => {
  assert.throws(
    () =>
      Order.place({
        orderId: "ord_empty",
        customerId: "cus_empty",
        items: [],
        currency: "INR",
      }),
    /at least one item/,
  );
});

test("order aggregate computes total and confirms state", () => {
  const order = Order.place({
    orderId: "ord_1",
    customerId: "cus_1",
    items: [
      { sku: "sku_1", quantity: 2, unitPriceInCents: 1000 },
      { sku: "sku_2", quantity: 1, unitPriceInCents: 500 },
    ],
    currency: "INR",
  });

  assert.equal(order.total().amountInCents, 2500);
  assert.equal(order.status, "pending-payment");
  assert.equal(order.confirm().status, "confirmed");
});
