import { RealtimeGateway } from "./module/server/realtime-gateway.js";
import { AuthService } from "./module/services/auth-service.js";
import { DeliveryService } from "./module/services/delivery-service.js";
import { SubscriptionService } from "./module/services/subscription-service.js";
import { RealtimeMetrics } from "./shared/socket-runtime.js";
import { logger } from "./shared/logger.js";

const gateway = new RealtimeGateway(
  new AuthService(),
  new SubscriptionService(),
  new DeliveryService(2),
  new RealtimeMetrics(),
);

const connection = gateway.connect({
  connectionId: "conn-slow-consumer",
  token: "viewer-token",
});

gateway.joinRoom(connection.connectionId, "tenant:tenant_alpha");
gateway.broadcastToRoom("tenant:tenant_alpha", "feed.item", { itemId: 1 });
gateway.broadcastToRoom("tenant:tenant_alpha", "feed.item", { itemId: 2 });

try {
  gateway.broadcastToRoom("tenant:tenant_alpha", "feed.item", { itemId: 3 });
} catch (error) {
  logger.warn("Slow consumer blocked", {
    message: error instanceof Error ? error.message : "Unknown error",
    connectionState: gateway.getConnection(connection.connectionId),
    metrics: gateway.snapshot().metrics,
    guidance: "Slow consumers should be handled explicitly because unbounded pending delivery queues become an operational risk under sustained fan-out.",
  });
}
