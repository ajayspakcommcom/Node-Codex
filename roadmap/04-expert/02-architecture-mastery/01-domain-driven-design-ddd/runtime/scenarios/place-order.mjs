import { InMemoryOrderRepository } from "../../dist/contexts/orders/infrastructure/in-memory-order-repository.js";
import { LegacyBillingAdapter } from "../../dist/contexts/billing/acl/legacy-billing-adapter.js";
import { PlaceOrderService } from "../../dist/contexts/orders/application/place-order-service.js";

const repository = new InMemoryOrderRepository();
const gateway = new LegacyBillingAdapter();
const service = new PlaceOrderService(repository, gateway);

const order = await service.execute({
  orderId: "ord_sample",
  customerId: "cus_sample",
  items: [
    { sku: "sku_1", quantity: 1, unitPriceInCents: 2500 },
    { sku: "sku_2", quantity: 2, unitPriceInCents: 1500 },
  ],
  currency: "INR",
});

console.log(
  JSON.stringify({
    scenario: "place-order",
    orderId: order.orderId,
    status: order.status,
    totalInCents: order.total().amountInCents,
  }),
);
