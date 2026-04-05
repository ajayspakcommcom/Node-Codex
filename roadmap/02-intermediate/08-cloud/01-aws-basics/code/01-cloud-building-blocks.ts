import { logger } from "./shared/logger.js";
import { billingApiWorkload } from "./shared/aws-runtime.js";
import { ServiceSelectionAdvisor } from "./module/aws/service-selection-advisor.js";

const advisor = new ServiceSelectionAdvisor();

logger.info("Cloud building blocks", {
  workload: billingApiWorkload.name,
  recommendation: advisor.recommend(billingApiWorkload),
});
