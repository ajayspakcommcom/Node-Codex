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

const v1Response = controller.list({
  method: "GET",
  path: "/api/v1/orders",
  consumerId: "legacy-dashboard",
});

const v2Response = controller.list({
  method: "GET",
  path: "/api/v2/orders",
  consumerId: "web-app",
});

logger.info("URI-based versioning", {
  v1Response,
  v2Response,
  guidance: "Visible URI versions are operationally simple, but version-specific behavior should stay near the boundary instead of forking the whole service layer.",
});
