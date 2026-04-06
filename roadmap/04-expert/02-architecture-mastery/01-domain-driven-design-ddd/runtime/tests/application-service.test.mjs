import test from "node:test";
import assert from "node:assert/strict";
import { PlaceOrderService } from "../../dist/contexts/orders/application/place-order-service.js";

test("application service orchestrates charge gateway and repository", async () => {
  const savedOrders = [];
  const chargedCommands = [];

  const repository = {
    async save(order) {
      savedOrders.push(order);
    },
    async findById() {
      return undefined;
    },
  };

  const chargeGateway = {
    async charge(command) {
      chargedCommands.push(command);
    },
  };

  const service = new PlaceOrderService(repository, chargeGateway);

  const order = await service.execute({
    orderId: "ord_201",
    customerId: "cus_201",
    items: [{ sku: "sku_201", quantity: 2, unitPriceInCents: 3000 }],
    currency: "INR",
  });

  assert.equal(order.status, "confirmed");
  assert.equal(savedOrders.length, 1);
  assert.equal(chargedCommands.length, 1);
  assert.equal(chargedCommands[0].amountInCents, 6000);
});
