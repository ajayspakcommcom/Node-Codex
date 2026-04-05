import { RbacPolicyEngine } from "./module/services/rbac-policy-engine.js";
import { principals } from "./shared/rbac-runtime.js";
import { logger } from "./shared/logger.js";

const policyEngine = new RbacPolicyEngine();

logger.info("Roles vs permissions", {
  memberPermissions: policyEngine.listPermissions(principals.member),
  managerPermissions: policyEngine.listPermissions(principals.manager),
  guidance: "Enterprise RBAC works best when roles bundle permissions clearly instead of role names becoming the only security logic in the system.",
});
