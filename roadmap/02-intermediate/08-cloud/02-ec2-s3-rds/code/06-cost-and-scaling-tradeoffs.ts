import { logger } from "./shared/logger.js";
import { billingApiWorkload, reportingApiWorkload, riskyLegacyWorkload } from "./shared/aws-service-runtime.js";
import { CostRiskAdvisor } from "./module/aws/cost-risk-advisor.js";

const advisor = new CostRiskAdvisor();

logger.info("EC2, S3, and RDS cost and scaling tradeoffs", {
  billingApi: advisor.assess(billingApiWorkload),
  reportingApi: advisor.assess(reportingApiWorkload),
  riskyLegacy: advisor.assess(riskyLegacyWorkload),
});
