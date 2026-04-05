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
const compromiseResponse = sessionService.handleReuseDetection(
  session.refreshToken.tokenId,
  sessionContext.nowEpochSeconds + 120,
);

logger.warn("Compromise response", {
  compromiseResponse,
  familyState: sessionFamilyStore.getRequired(sessionContext.familyId),
  revokedTokens: refreshTokenStore.listByFamily(sessionContext.familyId),
  guidance: "When a refresh token is suspected to be stolen, enterprise systems often revoke the entire session family rather than gambling on one-token containment.",
});
