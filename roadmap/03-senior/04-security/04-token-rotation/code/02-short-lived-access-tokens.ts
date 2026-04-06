import { createLogger } from "./shared/logger";

const logger = createLogger("short-lived-access");

logger.info("access_token_policy", {
  ttlMinutes: 15,
  note: "Short-lived access tokens reduce the exposure window when a token is stolen.",
});
