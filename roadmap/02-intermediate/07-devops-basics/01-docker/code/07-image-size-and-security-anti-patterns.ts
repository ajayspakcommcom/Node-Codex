import { logger } from "./shared/logger.js";
import { enterpriseApiSpec, riskyApiSpec } from "./shared/docker-runtime.js";
import { ImageRiskAdvisor } from "./module/build/image-risk-advisor.js";

const advisor = new ImageRiskAdvisor();

logger.warn("Image size and security anti-patterns", {
  enterprise: advisor.assess(enterpriseApiSpec),
  risky: advisor.assess(riskyApiSpec),
});
