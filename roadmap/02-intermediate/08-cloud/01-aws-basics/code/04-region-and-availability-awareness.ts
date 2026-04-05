import { logger } from "./shared/logger.js";
import { billingApiWorkload, publicMediaWorkload } from "./shared/aws-runtime.js";
import { RegionAvailabilityAdvisor } from "./module/aws/region-availability-advisor.js";

const advisor = new RegionAvailabilityAdvisor();

logger.info("Region and availability awareness", {
  billingApi: advisor.planFor(billingApiWorkload),
  publicMedia: advisor.planFor(publicMediaWorkload),
});
