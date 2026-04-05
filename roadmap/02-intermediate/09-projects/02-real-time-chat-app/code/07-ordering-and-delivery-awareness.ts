import { chatRuntime } from "./shared/chat-runtime.js";
import { logger } from "./shared/logger.js";
import { createChatPlatform } from "./module/bootstrap/chat-platform.js";

const platform = createChatPlatform();

const first = platform.gateway.connect({ connectionId: "conn_first", token: "token:member:alpha" }, chatRuntime.defaultNowEpochSeconds);
const second = platform.gateway.connect({ connectionId: "conn_second", token: "token:member:alpha:two" }, chatRuntime.defaultNowEpochSeconds);

platform.gateway.joinRoom(first.connectionId, "room_alpha_general");
platform.gateway.joinRoom(second.connectionId, "room_alpha_general");

platform.gateway.sendRoomMessage({
  connectionId: first.connectionId,
  roomId: "room_alpha_general",
  body: "Message one",
  nowEpochSeconds: chatRuntime.defaultNowEpochSeconds + 1,
});
platform.gateway.acknowledge(first.connectionId, 1);
platform.gateway.acknowledge(second.connectionId, 1);

platform.gateway.sendRoomMessage({
  connectionId: first.connectionId,
  roomId: "room_alpha_general",
  body: "Message two",
  nowEpochSeconds: chatRuntime.defaultNowEpochSeconds + 2,
});

const deliveryLog = platform.gateway.getConnection(second.connectionId).deliveryLog;

logger.info("Ordering and delivery awareness", {
  receivedSequences: deliveryLog.map((entry) => entry.sequence),
  receivedBodies: deliveryLog.map((entry) =>
    typeof entry.payload === "object" && entry.payload !== null && "body" in entry.payload
      ? (entry.payload as { readonly body: string }).body
      : "unknown",
  ),
});
