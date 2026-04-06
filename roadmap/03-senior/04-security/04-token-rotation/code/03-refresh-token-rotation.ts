import { createLogger } from "./shared/logger";
import { RefreshTokenStore } from "./shared/refresh-token-store";

const logger = createLogger("refresh-rotation");

class TokenRotationService {
  constructor(private readonly refreshTokenStore: RefreshTokenStore) {}

  rotate(oldTokenId: string): string {
    this.refreshTokenStore.markUsed(oldTokenId);

    const newTokenId = this.refreshTokenStore.issue("usr_100", "device_1");
    logger.info("refresh_token_rotated", { oldTokenId, newTokenId });

    return newTokenId;
  }
}

const store = new RefreshTokenStore();
const oldTokenId = store.issue("usr_100", "device_1");
new TokenRotationService(store).rotate(oldTokenId);
