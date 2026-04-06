import { createLogger } from "./shared/logger";

const logger = createLogger("session-scope");

interface SessionScope {
  readonly userId: string;
  readonly sessionId: string;
  readonly deviceId: string;
}

const session: SessionScope = {
  userId: "usr_88",
  sessionId: "sess_10",
  deviceId: "device_mobile_ios",
};

logger.info("scoped_session", {
  session,
  note: "Token lifecycle should support session- and device-level isolation.",
});
