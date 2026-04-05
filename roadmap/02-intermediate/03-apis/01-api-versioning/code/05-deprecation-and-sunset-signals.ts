import { OrderController } from "./module/controllers/order-controller.js";
import { InMemoryOrderStore } from "./module/infrastructure/in-memory-order-store.js";
import { OrderService } from "./module/services/order-service.js";
import { logger } from "./shared/logger.js";
import { createDefaultVersionPolicy, VersionUsageMetrics } from "./shared/versioning-runtime.js";

const controller = new OrderController(
  new OrderService(new InMemoryOrderStore()),
  createDefaultVersionPolicy(),
  new VersionUsageMetrics(),
);

const deprecatedVersionResponse = controller.list({
  method: "GET",
  path: "/api/v1/orders",
  consumerId: "legacy-reports",
});

logger.warn("Deprecation and sunset signals", {
  headers: deprecatedVersionResponse.headers,
  guidance: "Deprecation becomes operationally useful when clients receive explicit retirement signals instead of discovering removal by surprise.",
});
