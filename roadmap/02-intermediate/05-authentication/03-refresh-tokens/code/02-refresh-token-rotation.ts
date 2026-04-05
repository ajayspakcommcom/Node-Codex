import { AccessTokenService } from "./module/services/access-token-service.js";
import { RefreshTokenStore } from "./module/services/refresh-token-store.js";
import { SessionFamilyStore } from "./module/services/session-family-store.js";
import { SessionService } from "./module/services/session-service.js";
import { sessionContext } from "./shared/refresh-runtime.js";
import { logger } from "./shared/logger.js";

const refreshTokenStore = new RefreshTokenStore();
const sessionService = new SessionService(
  new AccessTokenService(),
  refreshTokenStore,
  new SessionFamilyStore(),
);
const session = sessionService.startSession(sessionContext);
const refreshed = sessionService.refresh({
  refreshTokenId: session.refreshToken.tokenId,
  nowEpochSeconds: sessionContext.nowEpochSeconds + 301,
});

logger.info("Refresh token rotation", {
  originalRefreshToken: refreshTokenStore.getRequired(session.refreshToken.tokenId),
  rotatedRefreshToken: refreshed.refreshToken,
  newAccessToken: refreshed.accessToken,
  guidance: "Enterprise refresh-token flows often rotate the refresh token after use so the long-lived credential does not remain static forever.",
});
