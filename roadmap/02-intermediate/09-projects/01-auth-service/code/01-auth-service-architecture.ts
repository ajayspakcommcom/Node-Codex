import { logger } from "./shared/logger.js";

logger.info("Auth service architecture", {
  layers: ["controller", "auth service", "authorization service", "repositories", "audit log"],
  workflows: ["register", "login", "verify access token", "refresh", "logout", "authorize"],
  enterpriseFocus: [
    "token lifecycle",
    "revocation-aware sessions",
    "rbac checks",
    "tenant boundaries",
    "audit visibility",
  ],
});
