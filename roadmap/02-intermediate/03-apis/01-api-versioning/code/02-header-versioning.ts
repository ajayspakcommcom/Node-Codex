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

const headerVersionedV1Response = controller.list({
  method: "GET",
  path: "/api/orders",
  headers: {
    "X-API-Version": "v1",
  },
  consumerId: "partner-sync",
});

const headerVersionedV2Response = controller.list({
  method: "GET",
  path: "/api/orders",
  headers: {
    "Accept-Version": "2",
  },
  consumerId: "admin-portal",
});

logger.info("Header-based versioning", {
  headerVersionedV1Response,
  headerVersionedV2Response,
  guidance: "Header-based versioning keeps URLs stable, but teams must make version choice visible in logs, tooling, and documentation.",
});
