import test from "node:test";
import assert from "node:assert/strict";
import { InMemoryOrderCommandRepository } from "../../dist/write-model/in-memory-order-command-repository.js";
import { PlaceOrderHandler } from "../../dist/write-model/place-order-handler.js";

test("command handler stores confirmed order in repository", () => {
  const repository = new InMemoryOrderCommandRepository();
  const handler = new PlaceOrderHandler(repository);

  const order = handler.execute({
    orderId: "ord_handler",
    customerId: "cus_handler",
    totalInCents: 12_000,
  });

  assert.equal(order.status, "confirmed");
  assert.equal(repository.findById("ord_handler")?.status, "confirmed");
});
