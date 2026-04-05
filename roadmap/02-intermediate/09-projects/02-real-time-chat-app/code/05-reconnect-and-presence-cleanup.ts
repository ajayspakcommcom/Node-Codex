import { chatRuntime } from "./shared/chat-runtime.js";
import { logger } from "./shared/logger.js";
import { createChatPlatform } from "./module/bootstrap/chat-platform.js";

const platform = createChatPlatform();

platform.gateway.connect({ connectionId: "conn_old", token: "token:member:alpha" }, chatRuntime.defaultNowEpochSeconds);
platform.gateway.connect({ connectionId: "conn_new", token: "token:member:alpha" }, chatRuntime.defaultNowEpochSeconds + 30);

platform.gateway.joinRoom("conn_old", "room_alpha_general");
platform.gateway.joinRoom("conn_new", "room_alpha_general");

const removed = platform.gateway.cleanupStaleConnections(
  chatRuntime.defaultNowEpochSeconds + chatRuntime.staleConnectionThresholdSeconds + 40,
);

logger.info("Reconnect and presence cleanup", {
  removedConnections: removed,
  snapshot: platform.gateway.snapshot(),
});
