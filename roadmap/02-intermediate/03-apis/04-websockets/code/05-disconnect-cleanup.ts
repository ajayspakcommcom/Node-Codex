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
);

const connection = gateway.connect({
  connectionId: "conn-cleanup",
  token: "analyst-token",
});

gateway.joinRoom(connection.connectionId, "tenant:tenant_alpha");
const beforeDisconnect = gateway.snapshot();
gateway.disconnect(connection.connectionId);
const afterDisconnect = gateway.snapshot();

logger.info("Disconnect cleanup", {
  beforeDisconnect,
  afterDisconnect,
  guidance: "Disconnect flow should release room membership and connection-owned state promptly so long-lived socket resources do not leak over time.",
});
