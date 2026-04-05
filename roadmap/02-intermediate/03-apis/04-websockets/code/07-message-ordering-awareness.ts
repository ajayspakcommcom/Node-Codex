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
  connectionId: "conn-ordering",
  token: "analyst-token",
});

gateway.joinRoom(connection.connectionId, "tenant:tenant_alpha");
gateway.broadcastToRoom("tenant:tenant_alpha", "dashboard.snapshot", { version: 1 });
gateway.broadcastToRoom("tenant:tenant_alpha", "dashboard.snapshot", { version: 2 });
gateway.broadcastToRoom("tenant:tenant_alpha", "dashboard.snapshot", { version: 3 });

logger.info("Message ordering awareness", {
  deliveries: gateway.getConnection(connection.connectionId).deliveryLog,
  guidance: "Sequence metadata makes ordering assumptions explicit so clients can reason about reconnects, retries, or out-of-order processing more safely.",
});
