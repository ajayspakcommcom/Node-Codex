import { createLogger } from "./shared/logger";

const logger = createLogger("suspicious-input");

logger.info("security_signal", {
  eventType: "suspicious_payload_detected",
  route: "/search",
  note: "Log the presence and location of suspicious patterns without storing harmful raw payloads unnecessarily.",
});
