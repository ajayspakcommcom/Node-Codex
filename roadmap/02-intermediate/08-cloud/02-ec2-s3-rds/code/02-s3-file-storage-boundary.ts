import { logger } from "./shared/logger.js";
import { billingApiWorkload, riskyLegacyWorkload } from "./shared/aws-service-runtime.js";
import { StorageBoundaryAdvisor } from "./module/aws/storage-boundary-advisor.js";

const advisor = new StorageBoundaryAdvisor();

logger.info("S3 file storage boundary", {
  billingApi: advisor.assess(billingApiWorkload),
  riskyLegacy: advisor.assess(riskyLegacyWorkload),
});
