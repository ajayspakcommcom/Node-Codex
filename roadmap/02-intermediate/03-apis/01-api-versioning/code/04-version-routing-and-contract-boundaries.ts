import { OrderController } from "./module/controllers/order-controller.js";
import { InMemoryOrderStore } from "./module/infrastructure/in-memory-order-store.js";
import { OrderService } from "./module/services/order-service.js";
import { logger } from "./shared/logger.js";
import { createDefaultVersionPolicy, VersionUsageMetrics } from "./shared/versioning-runtime.js";

const orderStore = new InMemoryOrderStore();
const orderService = new OrderService(orderStore);
const controller = new OrderController(orderService, createDefaultVersionPolicy(), new VersionUsageMetrics());

const v1Body = controller.list({
  method: "GET",
  path: "/api/v1/orders",
  consumerId: "legacy-mobile",
}).body;

const v2Body = controller.list({
  method: "GET",
  path: "/api/v2/orders",
  consumerId: "modern-web",
}).body;

logger.info("Version routing and contract boundaries", {
  rawDomainRecord: orderService.listOrders()[0],
  v1Body,
  v2Body,
  guidance: "The service returns one stable domain model while the controller and presenter shape version-specific contracts at the API boundary.",
});
