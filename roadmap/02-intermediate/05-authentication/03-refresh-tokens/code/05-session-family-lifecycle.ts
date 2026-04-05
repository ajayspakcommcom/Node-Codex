import { AccessTokenService } from "./module/services/access-token-service.js";
import { RefreshTokenStore } from "./module/services/refresh-token-store.js";
import { SessionFamilyStore } from "./module/services/session-family-store.js";
import { SessionService } from "./module/services/session-service.js";
import { sessionContext } from "./shared/refresh-runtime.js";
import { logger } from "./shared/logger.js";

const refreshTokenStore = new RefreshTokenStore();
const sessionFamilyStore = new SessionFamilyStore();
const sessionService = new SessionService(
  new AccessTokenService(),
  refreshTokenStore,
  sessionFamilyStore,
);

const initial = sessionService.startSession(sessionContext);
const rotatedOnce = sessionService.refresh({
  refreshTokenId: initial.refreshToken.tokenId,
  nowEpochSeconds: sessionContext.nowEpochSeconds + 301,
});
const rotatedTwice = sessionService.refresh({
  refreshTokenId: rotatedOnce.refreshToken.tokenId,
  nowEpochSeconds: sessionContext.nowEpochSeconds + 602,
});

logger.info("Session family lifecycle", {
  family: sessionFamilyStore.getRequired(sessionContext.familyId),
  tokenChain: refreshTokenStore.listByFamily(sessionContext.familyId),
  latestRefreshToken: rotatedTwice.refreshToken,
  guidance: "Enterprise systems often treat rotating refresh tokens as one session family so they can revoke the whole chain if compromise is detected.",
});
