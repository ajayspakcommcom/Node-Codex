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

const adminConnection = gateway.connect({
  connectionId: "conn-admin",
  token: "admin-token",
});

const analystConnection = gateway.connect({
  connectionId: "conn-analyst",
  token: "analyst-token",
});

gateway.joinRoom(adminConnection.connectionId, "tenant:tenant_alpha");
gateway.joinRoom(analystConnection.connectionId, "tenant:tenant_alpha");

gateway.sendToConnection(adminConnection.connectionId, "connection.ping", {
  traceId: "trc_1",
});
gateway.sendToUser("user_admin", "user.notification", {
  severity: "info",
});
gateway.broadcastToRoom("tenant:tenant_alpha", "tenant.dashboard.updated", {
  widget: "orders",
});

logger.info("Targeted broadcast patterns", {
  adminDeliveries: gateway.getConnection(adminConnection.connectionId).deliveryLog,
  analystDeliveries: gateway.getConnection(analystConnection.connectionId).deliveryLog,
  metrics: gateway.snapshot().metrics,
  guidance: "Enterprise systems should prefer the narrowest practical broadcast scope rather than treating every update as a global push.",
});
