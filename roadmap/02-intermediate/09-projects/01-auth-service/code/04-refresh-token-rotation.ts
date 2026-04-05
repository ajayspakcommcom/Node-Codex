import { authConfig } from "./shared/auth-service-runtime.js";
import { logger } from "./shared/logger.js";
import { createAuthPlatform } from "./module/bootstrap/auth-platform.js";

const platform = createAuthPlatform();

const login = platform.controller.login({
  email: "member@tenant-alpha.example",
  password: "ChangeMe123!",
  ipAddress: "203.0.113.12",
  userAgent: "Refresh Demo",
  nowEpochSeconds: authConfig.defaultNowEpochSeconds,
});

const refresh = platform.controller.refresh({
  refreshToken: login.body.refreshToken,
  nowEpochSeconds: authConfig.defaultNowEpochSeconds + 600,
});

logger.info("Refresh token rotation", {
  originalSessionId: login.body.sessionId,
  rotatedSessionId: refresh.body.sessionId,
  refreshTokenChanged: login.body.refreshToken !== refresh.body.refreshToken,
  accessTokenChanged: login.body.accessToken !== refresh.body.accessToken,
});
