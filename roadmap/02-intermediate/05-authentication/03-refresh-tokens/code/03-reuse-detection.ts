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

sessionService.refresh({
  refreshTokenId: session.refreshToken.tokenId,
  nowEpochSeconds: sessionContext.nowEpochSeconds + 301,
});

let reuseFailure = "";

try {
  sessionService.refresh({
    refreshTokenId: session.refreshToken.tokenId,
    nowEpochSeconds: sessionContext.nowEpochSeconds + 302,
  });
} catch (error: unknown) {
  reuseFailure = error instanceof Error ? error.message : "Unknown refresh-token reuse error.";
}

const compromiseResponse = sessionService.handleReuseDetection(
  session.refreshToken.tokenId,
  sessionContext.nowEpochSeconds + 302,
);

logger.warn("Reuse detection", {
  reuseFailure,
  compromiseResponse,
  familyState: sessionFamilyStore.getRequired(sessionContext.familyId),
  guidance: "If an old rotated refresh token is used again, enterprise systems often treat that as a replay signal and revoke the whole session family.",
});
