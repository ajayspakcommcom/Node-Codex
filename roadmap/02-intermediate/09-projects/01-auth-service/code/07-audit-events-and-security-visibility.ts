import { authConfig } from "./shared/auth-service-runtime.js";
import { logger } from "./shared/logger.js";
import { createAuthPlatform } from "./module/bootstrap/auth-platform.js";

const platform = createAuthPlatform();

platform.controller.login({
  email: "member@tenant-alpha.example",
  password: "ChangeMe123!",
  ipAddress: "203.0.113.16",
  userAgent: "Audit Demo",
  nowEpochSeconds: authConfig.defaultNowEpochSeconds,
});

const initialSession = platform.controller.login({
  email: "support@tenant-alpha.example",
  password: "Support123!",
  ipAddress: "203.0.113.17",
  userAgent: "Rotation Demo",
  nowEpochSeconds: authConfig.defaultNowEpochSeconds,
});

const rotated = platform.controller.refresh({
  refreshToken: initialSession.body.refreshToken,
  nowEpochSeconds: authConfig.defaultNowEpochSeconds + 300,
});

let reuseMessage = "reuse not detected";

try {
  platform.controller.refresh({
    refreshToken: initialSession.body.refreshToken,
    nowEpochSeconds: authConfig.defaultNowEpochSeconds + 360,
  });
} catch (error) {
  reuseMessage = error instanceof Error ? error.message : "unknown error";
}

const events = platform.auditLogService.list();

logger.warn("Audit events and security visibility", {
  latestRefreshSessionId: rotated.body.sessionId,
  reuseMessage,
  auditEventTypes: events.map((event) => event.type),
  errorEvents: events.filter((event) => event.severity === "error").length,
});
