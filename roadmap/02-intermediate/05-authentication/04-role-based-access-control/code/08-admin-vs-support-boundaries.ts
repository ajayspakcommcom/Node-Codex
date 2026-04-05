import { RbacPolicyEngine } from "./module/services/rbac-policy-engine.js";
import { principals } from "./shared/rbac-runtime.js";
import { logger } from "./shared/logger.js";

const policyEngine = new RbacPolicyEngine();

logger.info("Admin vs support boundaries", {
  supportCanSuspendUsers: policyEngine.hasPermission(principals.support, "users:suspend"),
  supportCanImpersonateReadonly: policyEngine.hasPermission(principals.support, "support:impersonate-readonly"),
  adminCanSuspendUsers: policyEngine.hasPermission(principals.admin, "users:suspend"),
  guidance: "Enterprise RBAC should distinguish support-style troubleshooting access from broader administrative power instead of collapsing both into one role.",
});
