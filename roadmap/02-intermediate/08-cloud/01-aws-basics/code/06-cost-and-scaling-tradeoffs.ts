import { logger } from "./shared/logger.js";
import { billingApiWorkload, publicMediaWorkload } from "./shared/aws-runtime.js";
import { CostScalingAdvisor } from "./module/aws/cost-scaling-advisor.js";

const advisor = new CostScalingAdvisor();

logger.info("Cost and scaling tradeoffs", {
  billingApi: advisor.assess(billingApiWorkload),
  publicMedia: advisor.assess(publicMediaWorkload),
});
