import { createLogger } from "./shared/logger";
import { RefreshTokenStore } from "./shared/refresh-token-store";

const logger = createLogger("revocation");

const store = new RefreshTokenStore();
const tokenId = store.issue("usr_200", "device_2");
store.revoke(tokenId);

logger.info("token_revoked", {
  tokenId,
  revoked: store.isRevoked(tokenId),
});
