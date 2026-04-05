import { logger } from "./shared/logger.js";
import { billingApiWorkload, reportingApiWorkload } from "./shared/aws-service-runtime.js";
import { DatabaseFitAdvisor } from "./module/aws/database-fit-advisor.js";

const advisor = new DatabaseFitAdvisor();

logger.info("RDS managed relational fit", {
  billingApi: advisor.assess(billingApiWorkload),
  reportingApi: advisor.assess(reportingApiWorkload),
});
