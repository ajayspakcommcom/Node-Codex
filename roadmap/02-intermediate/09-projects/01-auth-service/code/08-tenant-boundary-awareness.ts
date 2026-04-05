import { authConfig } from "./shared/auth-service-runtime.js";
import { logger } from "./shared/logger.js";
import { createAuthPlatform } from "./module/bootstrap/auth-platform.js";

const platform = createAuthPlatform();

const alphaAdmin = platform.controller.login({
  email: "admin@tenant-alpha.example",
  password: "Admin123!",
  ipAddress: "203.0.113.18",
  userAgent: "Tenant Demo",
  nowEpochSeconds: authConfig.defaultNowEpochSeconds,
});

const sameTenant = platform.controller.authorize({
  accessToken: alphaAdmin.body.accessToken,
  permission: "tenant:manage",
  resourceTenantId: "tenant_alpha",
  nowEpochSeconds: authConfig.defaultNowEpochSeconds + 45,
});

const crossTenant = platform.controller.authorize({
  accessToken: alphaAdmin.body.accessToken,
  permission: "tenant:manage",
  resourceTenantId: "tenant_beta",
  nowEpochSeconds: authConfig.defaultNowEpochSeconds + 45,
});

logger.info("Tenant boundary awareness", {
  sameTenantAllowed: sameTenant.allowed,
  crossTenantAllowed: crossTenant.allowed,
});
