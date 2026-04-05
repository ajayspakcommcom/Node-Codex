import { chatRuntime } from "./shared/chat-runtime.js";
import { logger } from "./shared/logger.js";
import { createChatPlatform } from "./module/bootstrap/chat-platform.js";

const platform = createChatPlatform();

const moderator = platform.gateway.connect({ connectionId: "conn_moderator", token: "token:moderator:alpha" }, chatRuntime.defaultNowEpochSeconds);
const member = platform.gateway.connect({ connectionId: "conn_muted_member", token: "token:member:alpha" }, chatRuntime.defaultNowEpochSeconds);

platform.gateway.joinRoom(moderator.connectionId, "room_alpha_general");
platform.gateway.joinRoom(member.connectionId, "room_alpha_general");

platform.gateway.muteUser({
  connectionId: moderator.connectionId,
  roomId: "room_alpha_general",
  targetUserId: "user_member_alpha",
});

let muteError = "message sent";

try {
  platform.gateway.sendRoomMessage({
    connectionId: member.connectionId,
    roomId: "room_alpha_general",
    body: "Am I muted?",
    nowEpochSeconds: chatRuntime.defaultNowEpochSeconds + 10,
  });
} catch (error) {
  muteError = error instanceof Error ? error.message : "unknown error";
}

logger.warn("Moderation and mute controls", {
  muteError,
  mutedUsers: platform.roomRepository.getRequired("room_alpha_general").mutedUserIds,
});
