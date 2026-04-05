import { chatRuntime } from "./shared/chat-runtime.js";
import { logger } from "./shared/logger.js";
import { createChatPlatform } from "./module/bootstrap/chat-platform.js";

const platform = createChatPlatform();

const sender = platform.gateway.connect({ connectionId: "conn_sender_slow", token: "token:member:alpha" }, chatRuntime.defaultNowEpochSeconds);
const slowConsumer = platform.gateway.connect({ connectionId: "conn_slow", token: "token:member:alpha:two" }, chatRuntime.defaultNowEpochSeconds);

platform.gateway.joinRoom(sender.connectionId, "room_alpha_general");
platform.gateway.joinRoom(slowConsumer.connectionId, "room_alpha_general");

let blockedMessage = "none";

try {
  for (const body of ["one", "two", "three", "four"]) {
    platform.gateway.sendRoomMessage({
      connectionId: sender.connectionId,
      roomId: "room_alpha_general",
      body,
      nowEpochSeconds: chatRuntime.defaultNowEpochSeconds + body.length,
    });
  }
} catch (error) {
  blockedMessage = error instanceof Error ? error.message : "unknown error";
}

logger.warn("Slow consumer backpressure", {
  blockedMessage,
  pendingDeliveries: platform.gateway.getConnection(slowConsumer.connectionId).pendingDeliveryCount,
  metrics: platform.gateway.snapshot().metrics,
});
