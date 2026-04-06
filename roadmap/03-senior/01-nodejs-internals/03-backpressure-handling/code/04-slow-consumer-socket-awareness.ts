import { SocketDeliveryService } from "./module/services/socket-delivery-service.js";
import { backpressureRuntime } from "./shared/backpressure-runtime.js";
import { logger } from "./shared/logger.js";

const deliveryService = new SocketDeliveryService();
const consumer = {
  consumerId: "consumer_slow_1",
  pendingMessages: 0,
  maxPendingMessages: backpressureRuntime.defaultSocketPendingLimit,
};

const outcomes = [
  deliveryService.tryDeliver(consumer),
  deliveryService.tryDeliver(consumer),
  deliveryService.tryDeliver(consumer),
];

logger.warn("Slow consumer socket awareness", {
  outcomes,
  pendingMessages: consumer.pendingMessages,
  takeaway: "slow consumers need bounded pending work instead of unlimited delivery backlog.",
});
