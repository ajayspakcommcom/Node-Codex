import { logger } from "./shared/logger.js";
import { localConfig, productionConfig } from "./shared/config-runtime.js";
import { SecretHandlingAdvisor } from "./module/config/secret-handling-advisor.js";

const advisor = new SecretHandlingAdvisor();

logger.warn("Secret handling awareness", {
  local: advisor.assess(localConfig),
  production: advisor.assess(productionConfig),
});
