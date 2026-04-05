import { authConfig } from "./shared/auth-service-runtime.js";
import { logger } from "./shared/logger.js";
import { createAuthPlatform } from "./module/bootstrap/auth-platform.js";

const platform = createAuthPlatform();

const login = platform.controller.login({
  email: "member@tenant-alpha.example",
  password: "ChangeMe123!",
  ipAddress: "203.0.113.13",
  userAgent: "Logout Demo",
  nowEpochSeconds: authConfig.defaultNowEpochSeconds,
});

const logout = platform.controller.logout({
  accessToken: login.body.accessToken,
  nowEpochSeconds: authConfig.defaultNowEpochSeconds + 120,
});

let postLogoutMessage = "token still valid";

try {
  platform.controller.getMe({
    accessToken: login.body.accessToken,
    nowEpochSeconds: authConfig.defaultNowEpochSeconds + 180,
  });
} catch (error) {
  postLogoutMessage = error instanceof Error ? error.message : "unknown error";
}

logger.info("Logout and session revocation", {
  logoutStatus: logout.statusCode,
  sessionStatus: logout.sessionStatus,
  postLogoutMessage,
});
