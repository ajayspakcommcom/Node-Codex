import { authConfig } from "./shared/auth-service-runtime.js";
import { logger } from "./shared/logger.js";
import { createAuthPlatform } from "./module/bootstrap/auth-platform.js";

const platform = createAuthPlatform();

const supportLogin = platform.controller.login({
  email: "support@tenant-alpha.example",
  password: "Support123!",
  ipAddress: "203.0.113.14",
  userAgent: "Support Demo",
  nowEpochSeconds: authConfig.defaultNowEpochSeconds,
});

const adminLogin = platform.controller.login({
  email: "admin@tenant-alpha.example",
  password: "Admin123!",
  ipAddress: "203.0.113.15",
  userAgent: "Admin Demo",
  nowEpochSeconds: authConfig.defaultNowEpochSeconds,
});

const supportTenantManage = platform.controller.authorize({
  accessToken: supportLogin.body.accessToken,
  permission: "tenant:manage",
  resourceTenantId: "tenant_alpha",
  nowEpochSeconds: authConfig.defaultNowEpochSeconds + 30,
});

const adminTenantManage = platform.controller.authorize({
  accessToken: adminLogin.body.accessToken,
  permission: "tenant:manage",
  resourceTenantId: "tenant_alpha",
  nowEpochSeconds: authConfig.defaultNowEpochSeconds + 30,
});

logger.info("Role based route authorization", {
  supportAllowed: supportTenantManage.allowed,
  adminAllowed: adminTenantManage.allowed,
});
