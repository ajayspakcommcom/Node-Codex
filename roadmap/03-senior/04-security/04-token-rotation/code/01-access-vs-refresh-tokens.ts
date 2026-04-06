import { createLogger } from "./shared/logger";

const logger = createLogger("token-types");

logger.info("access_token_role", {
  role: "short-lived credential for API authorization",
});

logger.info("refresh_token_role", {
  role: "credential used to obtain a new access token under stricter controls",
});
