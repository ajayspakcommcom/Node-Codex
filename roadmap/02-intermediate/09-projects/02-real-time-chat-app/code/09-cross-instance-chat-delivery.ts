import { chatRuntime } from "./shared/chat-runtime.js";
import { logger } from "./shared/logger.js";
import { RedisLikeChatBroker } from "./module/broker/redis-like-chat-broker.js";
import { createChatPlatform } from "./module/bootstrap/chat-platform.js";

const broker = new RedisLikeChatBroker();
const firstNode = createChatPlatform(broker);
const secondNode = createChatPlatform(broker);

const sender = firstNode.gateway.connect({ connectionId: "conn_node_a", token: "token:member:alpha" }, chatRuntime.defaultNowEpochSeconds);
const receiver = secondNode.gateway.connect({ connectionId: "conn_node_b", token: "token:member:alpha:two" }, chatRuntime.defaultNowEpochSeconds);

firstNode.gateway.joinRoom(sender.connectionId, "room_alpha_general");
secondNode.gateway.joinRoom(receiver.connectionId, "room_alpha_general");

firstNode.gateway.sendRoomMessage({
  connectionId: sender.connectionId,
  roomId: "room_alpha_general",
  body: "Cross instance hello",
  nowEpochSeconds: chatRuntime.defaultNowEpochSeconds + 20,
  broker,
});

logger.info("Cross instance chat delivery", {
  firstNodeDeliveries: firstNode.gateway.getConnection(sender.connectionId).deliveryLog.length,
  secondNodeDeliveries: secondNode.gateway.getConnection(receiver.connectionId).deliveryLog.length,
  secondNodeMetrics: secondNode.gateway.snapshot().metrics,
});
