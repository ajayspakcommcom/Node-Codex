import { createLogger } from "./shared/logger";

const logger = createLogger("security-logging");

logger.info("security_event", {
  eventType: "refresh_token_reuse_detected",
  actorId: "usr_120",
  sourceIp: "masked",
  note: "Security logs should support response without leaking sensitive secrets or raw tokens.",
});
