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

const viewerConnection = gateway.connect({
  connectionId: "conn-viewer",
  token: "viewer-token",
});

gateway.joinRoom(viewerConnection.connectionId, "tenant:tenant_alpha");

try {
  gateway.joinRoom(viewerConnection.connectionId, "ops:global");
} catch (error) {
  logger.warn("Unauthorized room join blocked", {
    message: error instanceof Error ? error.message : "Unknown error",
  });
}

const adminConnection = gateway.connect({
  connectionId: "conn-admin",
  token: "admin-token",
});

gateway.joinRoom(adminConnection.connectionId, "ops:global");

logger.info("Authorized room joins", {
  viewerRooms: [...gateway.getConnection(viewerConnection.connectionId).activeRooms],
  adminRooms: [...gateway.getConnection(adminConnection.connectionId).activeRooms],
  guidance: "Connected users should not automatically receive every stream. Room joins need explicit authorization rules.",
});
