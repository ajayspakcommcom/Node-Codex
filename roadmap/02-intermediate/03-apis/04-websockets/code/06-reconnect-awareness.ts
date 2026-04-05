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

gateway.connect({
  connectionId: "conn-reconnect-1",
  token: "viewer-token",
});

gateway.disconnect("conn-reconnect-1");

gateway.connect({
  connectionId: "conn-reconnect-2",
  token: "viewer-token",
});

logger.info("Reconnect awareness", {
  gatewaySnapshot: gateway.snapshot(),
  guidance: "Reconnects are a normal real-time path. Systems should observe and handle them explicitly instead of treating them as rare anomalies.",
});
