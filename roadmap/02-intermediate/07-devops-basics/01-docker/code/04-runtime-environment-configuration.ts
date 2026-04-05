import { logger } from "./shared/logger.js";
import { enterpriseApiSpec, riskyApiSpec } from "./shared/docker-runtime.js";
import { RuntimeConfigAdvisor } from "./module/build/runtime-config-advisor.js";

const advisor = new RuntimeConfigAdvisor();

logger.info("Runtime environment configuration", {
  enterprise: advisor.summarize(enterpriseApiSpec),
  risky: advisor.summarize(riskyApiSpec),
});
