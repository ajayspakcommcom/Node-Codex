import { authConfig } from "./shared/auth-service-runtime.js";
import { logger } from "./shared/logger.js";
import { createAuthPlatform } from "./module/bootstrap/auth-platform.js";

const platform = createAuthPlatform();

const registration = platform.controller.register({
  email: "new.member@tenant-alpha.example",
  password: "Member123!",
  tenantId: "tenant_alpha",
});

const login = platform.controller.login({
  email: "new.member@tenant-alpha.example",
  password: "Member123!",
  ipAddress: "203.0.113.10",
  userAgent: "Mozilla/5.0 Enterprise Demo",
  nowEpochSeconds: authConfig.defaultNowEpochSeconds,
});

logger.info("Registration and login flow", {
  registrationStatus: registration.statusCode,
  userId: registration.user.id,
  loginStatus: login.statusCode,
  sessionId: login.body.sessionId,
  accessTokenPreview: login.body.accessToken.slice(0, 24),
  refreshTokenPreview: login.body.refreshToken.slice(0, 18),
});
