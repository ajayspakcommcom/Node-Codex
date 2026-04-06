import { InMemoryOrderRepository } from "./contexts/orders/infrastructure/in-memory-order-repository.js";
import { LegacyBillingAdapter } from "./contexts/billing/acl/legacy-billing-adapter.js";
import { PlaceOrderService } from "./contexts/orders/application/place-order-service.js";
import { createLogger } from "./shared/logger.js";

const logger = createLogger("ddd");

const orderRepository = new InMemoryOrderRepository();
const billingAdapter = new LegacyBillingAdapter();
const placeOrderService = new PlaceOrderService(orderRepository, billingAdapter);

void placeOrderService
  .execute({
    orderId: "ord_901",
    customerId: "cus_901",
    items: [{ sku: "sku_9", quantity: 1, unitPriceInCents: 9_999 }],
    currency: "INR",
  })
  .then((order) => {
    logger.info("application_service_completed", {
      orderId: order.orderId,
      status: order.status,
    });
  });
