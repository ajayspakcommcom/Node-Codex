import { logger } from "./shared/logger.js";
import { sharedResponsibilityExample } from "./shared/aws-runtime.js";
import { SharedResponsibilityAdvisor } from "./module/aws/shared-responsibility-advisor.js";

const advisor = new SharedResponsibilityAdvisor();

logger.info("Shared responsibility awareness", advisor.summarize(sharedResponsibilityExample));
