import { OrderController } from "./module/controllers/order-controller.js";
import { InMemoryOrderStore } from "./module/infrastructure/in-memory-order-store.js";
import { OrderService } from "./module/services/order-service.js";
import { logger } from "./shared/logger.js";
import { createDefaultVersionPolicy, VersionUsageMetrics } from "./shared/versioning-runtime.js";

const metrics = new VersionUsageMetrics();
const controller = new OrderController(
  new OrderService(new InMemoryOrderStore()),
  createDefaultVersionPolicy(),
  metrics,
);

controller.list({
  method: "GET",
  path: "/api/v1/orders",
  consumerId: "legacy-mobile",
});

controller.list({
  method: "GET",
  path: "/api/v2/orders",
  consumerId: "web-app",
});

controller.create({
  method: "POST",
  path: "/api/orders",
  headers: {
    "Accept-Version": "2",
  },
  body: {
    customerId: "cust_analytics",
    total: {
      amountInCents: 32000,
      currency: "USD",
    },
    fulfillmentPriority: "standard",
  },
  consumerId: "internal-analytics",
});

logger.info("Observability by version", {
  metrics: metrics.snapshot(),
  guidance: "Deprecation planning requires visibility into which routes and consumers still depend on older versions.",
});
