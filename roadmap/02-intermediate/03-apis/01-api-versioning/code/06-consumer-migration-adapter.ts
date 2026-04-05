import { OrderController } from "./module/controllers/order-controller.js";
import { InMemoryOrderStore } from "./module/infrastructure/in-memory-order-store.js";
import { OrderService } from "./module/services/order-service.js";
import type { V1OrderDto, V2OrderDto } from "./shared/order-contracts.js";
import { logger } from "./shared/logger.js";
import { createDefaultVersionPolicy, VersionUsageMetrics } from "./shared/versioning-runtime.js";

const controller = new OrderController(
  new OrderService(new InMemoryOrderStore()),
  createDefaultVersionPolicy(),
  new VersionUsageMetrics(),
);

const legacyOrders = controller.list({
  method: "GET",
  path: "/api/v1/orders",
  consumerId: "legacy-dashboard",
}).body as readonly V1OrderDto[];

const migratedOrders = legacyOrders.map(toV2CompatibleShape);

logger.info("Consumer migration adapter", {
  legacyOrders,
  migratedOrders,
  guidance: "Migration adapters help consumers move safely, but they should be treated as temporary bridges rather than permanent hidden translation layers.",
});

function toV2CompatibleShape(order: V1OrderDto): V2OrderDto {
  return {
    id: order.id,
    total: {
      amountInCents: order.totalInCents,
      currency: "USD",
    },
    status: order.status,
    fulfillment: {
      priority: order.isRush ? "expedited" : "standard",
    },
    createdAt: "migration-placeholder",
  };
}
