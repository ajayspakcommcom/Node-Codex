import { logger } from "./shared/logger.js";
import { IamBoundaryAdvisor } from "./module/aws/iam-boundary-advisor.js";

const advisor = new IamBoundaryAdvisor();

logger.warn("IAM and security boundaries", {
  disciplined: advisor.assess({
    usesAdminPermissions: false,
    rolesSeparatedByPurpose: true,
    secretsScopedPerEnvironment: true,
  }),
  risky: advisor.assess({
    usesAdminPermissions: true,
    rolesSeparatedByPurpose: false,
    secretsScopedPerEnvironment: false,
  }),
});
