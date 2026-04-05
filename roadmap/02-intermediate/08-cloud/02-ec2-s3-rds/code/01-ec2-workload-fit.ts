import { logger } from "./shared/logger.js";
import { billingApiWorkload, reportingApiWorkload } from "./shared/aws-service-runtime.js";
import { ComputeFitAdvisor } from "./module/aws/compute-fit-advisor.js";

const advisor = new ComputeFitAdvisor();

logger.info("EC2 workload fit", {
  billingApi: advisor.recommend(billingApiWorkload),
  reportingApi: advisor.recommend(reportingApiWorkload),
});
