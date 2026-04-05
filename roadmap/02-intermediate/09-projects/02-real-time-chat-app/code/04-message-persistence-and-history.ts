import { chatRuntime } from "./shared/chat-runtime.js";
import { logger } from "./shared/logger.js";
import { createChatPlatform } from "./module/bootstrap/chat-platform.js";

const platform = createChatPlatform();

const member = platform.gateway.connect({ connectionId: "conn_history_member", token: "token:member:alpha" }, chatRuntime.defaultNowEpochSeconds);
platform.gateway.joinRoom(member.connectionId, "room_alpha_general");

platform.gateway.sendRoomMessage({
  connectionId: member.connectionId,
  roomId: "room_alpha_general",
  body: "First persisted message",
  nowEpochSeconds: chatRuntime.defaultNowEpochSeconds + 1,
});
platform.gateway.acknowledge(member.connectionId, 1);

platform.gateway.sendRoomMessage({
  connectionId: member.connectionId,
  roomId: "room_alpha_general",
  body: "Second persisted message",
  nowEpochSeconds: chatRuntime.defaultNowEpochSeconds + 2,
});

const history = platform.gateway.history(member.connectionId, "room_alpha_general");

logger.info("Message persistence and history", {
  historyCount: history.length,
  latestBodies: history.map((message) => message.body),
  sequences: history.map((message) => message.sequence),
});
