import { logger } from "./shared/logger.js";
import { billingApiWorkload, riskyLegacyWorkload } from "./shared/aws-service-runtime.js";
import { DurabilityAdvisor } from "./module/aws/durability-advisor.js";

const advisor = new DurabilityAdvisor();

logger.info("Durability and availability awareness", {
  billingApi: advisor.assess(billingApiWorkload),
  riskyLegacy: advisor.assess(riskyLegacyWorkload),
});
