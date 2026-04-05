import { logger } from "./shared/logger.js";
import { enterpriseApiSpec, riskyApiSpec } from "./shared/docker-runtime.js";
import { DockerignoreAdvisor } from "./module/build/dockerignore-advisor.js";

const advisor = new DockerignoreAdvisor();

logger.info(".dockerignore awareness", {
  enterpriseMissingEntries: advisor.missingImportantEntries(enterpriseApiSpec),
  riskyMissingEntries: advisor.missingImportantEntries(riskyApiSpec),
});
