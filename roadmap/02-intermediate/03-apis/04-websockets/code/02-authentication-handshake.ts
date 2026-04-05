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

try {
  gateway.connect({
    connectionId: "conn-unauthorized",
  });
} catch (error) {
  logger.warn("Authentication handshake blocked", {
    message: error instanceof Error ? error.message : "Unknown error",
    guidance: "A socket handshake should authenticate explicitly instead of allowing anonymous persistent connections by default.",
  });
}

const authenticatedConnection = gateway.connect({
  connectionId: "conn-authorized",
  token: "analyst-token",
});

logger.info("Authentication handshake success", {
  authenticatedConnection,
});
