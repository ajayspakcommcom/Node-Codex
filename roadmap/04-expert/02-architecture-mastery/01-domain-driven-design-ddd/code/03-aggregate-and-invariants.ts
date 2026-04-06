import { Order } from "./contexts/orders/domain/order.js";
import { createLogger } from "./shared/logger.js";

const logger = createLogger("ddd");

const order = Order.place({
  orderId: "ord_900",
  customerId: "cus_900",
  items: [
    { sku: "sku_1", quantity: 2, unitPriceInCents: 12_500 },
    { sku: "sku_2", quantity: 1, unitPriceInCents: 5_500 },
  ],
  currency: "INR",
});

logger.info("aggregate_invariants_enforced", {
  orderId: order.orderId,
  totalInCents: order.total().amountInCents,
  status: order.status,
});
