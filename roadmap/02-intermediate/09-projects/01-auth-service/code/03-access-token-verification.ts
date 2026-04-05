import { authConfig } from "./shared/auth-service-runtime.js";
import { logger } from "./shared/logger.js";
import { createAuthPlatform } from "./module/bootstrap/auth-platform.js";

const platform = createAuthPlatform();

const login = platform.controller.login({
  email: "member@tenant-alpha.example",
  password: "ChangeMe123!",
  ipAddress: "203.0.113.11",
  userAgent: "Node Codex Demo",
  nowEpochSeconds: authConfig.defaultNowEpochSeconds,
});

const me = platform.controller.getMe({
  accessToken: login.body.accessToken,
  nowEpochSeconds: authConfig.defaultNowEpochSeconds + 60,
});

logger.info("Access token verification", {
  statusCode: me.statusCode,
  principal: {
    userId: me.principal.userId,
    tenantId: me.principal.tenantId,
    roles: me.principal.roles,
    permissions: me.principal.permissions,
  },
});
