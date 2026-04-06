import { createLogger } from "./shared/logger";
import { RefreshTokenStore } from "./shared/refresh-token-store";

const logger = createLogger("replay-detection");

const store = new RefreshTokenStore();
const tokenId = store.issue("usr_100", "device_1");

store.markUsed(tokenId);

logger.info("refresh_reuse_detected", {
  tokenId,
  compromised: store.isUsed(tokenId),
  note: "Reused refresh tokens should be treated as a compromise signal, not a normal retry.",
});
