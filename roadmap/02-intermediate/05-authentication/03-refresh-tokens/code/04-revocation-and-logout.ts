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
const session = sessionService.startSession(sessionContext);
const logoutResult = sessionService.logout(sessionContext.familyId, sessionContext.nowEpochSeconds + 600);

let postLogoutRefreshFailure = "";

try {
  sessionService.refresh({
    refreshTokenId: session.refreshToken.tokenId,
    nowEpochSeconds: sessionContext.nowEpochSeconds + 601,
  });
} catch (error: unknown) {
  postLogoutRefreshFailure = error instanceof Error ? error.message : "Unknown logout refresh failure.";
}

logger.info("Revocation and logout", {
  logoutResult,
  familyState: sessionFamilyStore.getRequired(sessionContext.familyId),
  revokedTokens: refreshTokenStore.listByFamily(sessionContext.familyId),
  postLogoutRefreshFailure,
  guidance: "Logout and administrative revocation usually require server-side session control, which is why refresh-token support is not purely stateless in practice.",
});
