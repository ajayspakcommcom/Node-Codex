import { logger } from "./shared/logger.js";
import { billingApiWorkload, publicMediaWorkload } from "./shared/aws-runtime.js";
import { ServiceSelectionAdvisor } from "./module/aws/service-selection-advisor.js";

const advisor = new ServiceSelectionAdvisor();

logger.info("Service selection basics", {
  billingApi: advisor.recommend(billingApiWorkload),
  publicMedia: advisor.recommend(publicMediaWorkload),
});
