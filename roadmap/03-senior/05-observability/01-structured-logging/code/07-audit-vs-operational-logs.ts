import { createAuditLogger, createLogger } from "./shared/logger";

const operationalLogger = createLogger({
  service: "admin-api",
  environment: "production",
  version: "2026.04.06",
});

const auditLogger = createAuditLogger({
  service: "admin-api",
  environment: "production",
  version: "2026.04.06",
});

operationalLogger.info("cache_refreshed", { component: "admin-dashboard" });

auditLogger.info("admin_role_changed", {
  actorUserId: "usr_admin_1",
  targetUserId: "usr_52",
  role: "finance-admin",
});
