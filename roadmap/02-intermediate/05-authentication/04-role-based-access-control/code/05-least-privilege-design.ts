import { RbacPolicyEngine } from "./module/services/rbac-policy-engine.js";
import { principals } from "./shared/rbac-runtime.js";
import { logger } from "./shared/logger.js";

const policyEngine = new RbacPolicyEngine();

logger.info("Least privilege design", {
  memberPermissions: policyEngine.listPermissions(principals.member),
  supportPermissions: policyEngine.listPermissions(principals.support),
  adminPermissions: policyEngine.listPermissions(principals.admin),
  guidance: "Least privilege means different roles get only the permissions they need, not a convenience-first superset of everything.",
});
