import { RedisLikePubSubBroker } from "./module/broker/redis-like-pubsub.js";
import { RealtimeGateway } from "./module/server/realtime-gateway.js";
import { AuthService } from "./module/services/auth-service.js";
import { DeliveryService } from "./module/services/delivery-service.js";
import { SubscriptionService } from "./module/services/subscription-service.js";
import { RealtimeMetrics } from "./shared/socket-runtime.js";
import { logger } from "./shared/logger.js";

const gateway = new RealtimeGateway(
  new AuthService(),
  new SubscriptionService(),
  new DeliveryService(5),
  new RealtimeMetrics(),
  new RedisLikePubSubBroker(),
);

const connection = gateway.connect({
  connectionId: "conn-1001",
  token: "viewer-token",
});

gateway.joinRoom(connection.connectionId, "tenant:tenant_alpha");
gateway.broadcastToRoom("tenant:tenant_alpha", "inventory.updated", {
  productId: "prd_1001",
});
gateway.disconnect(connection.connectionId);

logger.info("Connection lifecycle", {
  connectionLog: connection.deliveryLog,
  gatewaySnapshot: gateway.snapshot(),
  guidance: "Enterprise WebSocket systems should make connect, subscribe, deliver, and disconnect behavior explicit rather than hiding connection state transitions.",
});
