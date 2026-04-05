import { chatRuntime } from "./shared/chat-runtime.js";
import { logger } from "./shared/logger.js";
import { createChatPlatform } from "./module/bootstrap/chat-platform.js";

const platform = createChatPlatform();

const member = platform.gateway.connect(
  {
    connectionId: "conn_member_alpha",
    token: "token:member:alpha",
  },
  chatRuntime.defaultNowEpochSeconds,
);

platform.gateway.joinRoom(member.connectionId, "room_alpha_general");

let crossTenantError = "none";

try {
  platform.gateway.joinRoom(member.connectionId, "room_beta_general");
} catch (error) {
  crossTenantError = error instanceof Error ? error.message : "unknown error";
}

logger.info("Authenticated connections and room joins", {
  joinedRooms: [...platform.gateway.getConnection(member.connectionId).activeRooms],
  crossTenantError,
});
