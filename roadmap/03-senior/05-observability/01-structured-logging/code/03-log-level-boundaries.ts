import { createLogger } from "./shared/logger";

const logger = createLogger({
  service: "auth-api",
  environment: "production",
  version: "2026.04.06",
});

logger.info("user_login_started", { requestId: "req_1" });
logger.warn("refresh_token_reuse_detected", { requestId: "req_1", userId: "usr_1" });
logger.error("identity_provider_timeout", { requestId: "req_1", dependency: "idp" });
