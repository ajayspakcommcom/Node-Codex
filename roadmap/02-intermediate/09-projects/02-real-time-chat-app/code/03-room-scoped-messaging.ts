import { chatRuntime } from "./shared/chat-runtime.js";
import { logger } from "./shared/logger.js";
import { createChatPlatform } from "./module/bootstrap/chat-platform.js";

const platform = createChatPlatform();

const sender = platform.gateway.connect({ connectionId: "conn_sender", token: "token:member:alpha" }, chatRuntime.defaultNowEpochSeconds);
const recipient = platform.gateway.connect({ connectionId: "conn_recipient", token: "token:member:alpha:two" }, chatRuntime.defaultNowEpochSeconds);
const moderator = platform.gateway.connect({ connectionId: "conn_mod", token: "token:moderator:alpha" }, chatRuntime.defaultNowEpochSeconds);

platform.gateway.joinRoom(sender.connectionId, "room_alpha_general");
platform.gateway.joinRoom(recipient.connectionId, "room_alpha_general");
platform.gateway.joinRoom(moderator.connectionId, "room_alpha_incident");

platform.gateway.sendRoomMessage({
  connectionId: sender.connectionId,
  roomId: "room_alpha_general",
  body: "Hello team",
  nowEpochSeconds: chatRuntime.defaultNowEpochSeconds + 5,
});

logger.info("Room scoped messaging", {
  senderDeliveries: platform.gateway.getConnection(sender.connectionId).deliveryLog.length,
  recipientDeliveries: platform.gateway.getConnection(recipient.connectionId).deliveryLog.length,
  moderatorDeliveries: platform.gateway.getConnection(moderator.connectionId).deliveryLog.length,
});
