import { RoleDesignAdvisor } from "./module/advisors/role-design-advisor.js";
import { logger } from "./shared/logger.js";

const assessment = new RoleDesignAdvisor().assess({
  roleCount: 9,
  exceptionDrivenRoles: 4,
  averagePermissionsPerRole: 5,
});

logger.warn("Role explosion risk", {
  assessment,
  guidance: "When every special case becomes a new role, the permission model becomes harder to reason about and easier to misuse.",
});
