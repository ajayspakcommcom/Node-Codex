import { RedisLikePubSubBroker } from "./module/broker/redis-like-pubsub.js";
import { RealtimeGateway } from "./module/server/realtime-gateway.js";
import { AuthService } from "./module/services/auth-service.js";
import { DeliveryService } from "./module/services/delivery-service.js";
import { SubscriptionService } from "./module/services/subscription-service.js";
import { RealtimeMetrics } from "./shared/socket-runtime.js";
import { logger } from "./shared/logger.js";

const broker = new RedisLikePubSubBroker();

const instanceOne = new RealtimeGateway(
  new AuthService(),
  new SubscriptionService(),
  new DeliveryService(5),
  new RealtimeMetrics(),
  broker,
);

const instanceTwo = new RealtimeGateway(
  new AuthService(),
  new SubscriptionService(),
  new DeliveryService(5),
  new RealtimeMetrics(),
  broker,
);

const connectionOne = instanceOne.connect({
  connectionId: "conn-instance-1",
  token: "viewer-token",
});

const connectionTwo = instanceTwo.connect({
  connectionId: "conn-instance-2",
  token: "analyst-token",
});

instanceOne.joinRoom(connectionOne.connectionId, "tenant:tenant_alpha");
instanceTwo.joinRoom(connectionTwo.connectionId, "tenant:tenant_alpha");

broker.publish("tenant:tenant_alpha", "inventory.synced", {
  productId: "prd_1001",
});

logger.info("Cross-instance pub-sub awareness", {
  instanceOneDeliveries: instanceOne.getConnection(connectionOne.connectionId).deliveryLog,
  instanceTwoDeliveries: instanceTwo.getConnection(connectionTwo.connectionId).deliveryLog,
  guidance: "In scaled deployments, shared pub-sub helps instances coordinate room broadcasts instead of assuming one process owns every active connection.",
});
