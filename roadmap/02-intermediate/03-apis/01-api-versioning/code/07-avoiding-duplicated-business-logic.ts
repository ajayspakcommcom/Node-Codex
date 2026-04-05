import { OrderController } from "./module/controllers/order-controller.js";
import { InMemoryOrderStore } from "./module/infrastructure/in-memory-order-store.js";
import { OrderService } from "./module/services/order-service.js";
import { logger } from "./shared/logger.js";
import { createDefaultVersionPolicy, VersionUsageMetrics } from "./shared/versioning-runtime.js";

const orderStore = new InMemoryOrderStore();
const orderService = new OrderService(orderStore);
const controller = new OrderController(orderService, createDefaultVersionPolicy(), new VersionUsageMetrics());

const createdFromV1 = controller.create({
  method: "POST",
  path: "/api/v1/orders",
  body: {
    customerId: "cust_legacy",
    totalInCents: 18000,
    rush: true,
  },
  consumerId: "legacy-backoffice",
});

const createdFromV2 = controller.create({
  method: "POST",
  path: "/api/v2/orders",
  body: {
    customerId: "cust_modern",
    total: {
      amountInCents: 18000,
      currency: "EUR",
    },
    fulfillmentPriority: "expedited",
  },
  consumerId: "modern-backoffice",
});

logger.info("Avoiding duplicated business logic", {
  createdFromV1: createdFromV1.body,
  createdFromV2: createdFromV2.body,
  sharedDomainOrders: orderService.listOrders(),
  guidance: "Both versions use one service and one store. Only contract parsing and response shaping differ by version.",
});
