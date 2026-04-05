import { AccessTokenService } from "./module/services/access-token-service.js";
import { RefreshTokenStore } from "./module/services/refresh-token-store.js";
import { SessionFamilyStore } from "./module/services/session-family-store.js";
import { SessionService } from "./module/services/session-service.js";
import { sessionContext } from "./shared/refresh-runtime.js";
import { logger } from "./shared/logger.js";

const sessionService = new SessionService(
  new AccessTokenService(),
  new RefreshTokenStore(),
  new SessionFamilyStore(),
);
const session = sessionService.startSession(sessionContext);

logger.info("Short-lived access plus refresh", {
  accessToken: session.accessToken,
  refreshToken: session.refreshToken,
  guidance: "Refresh tokens exist so access tokens can stay short-lived while the overall session remains usable.",
});
