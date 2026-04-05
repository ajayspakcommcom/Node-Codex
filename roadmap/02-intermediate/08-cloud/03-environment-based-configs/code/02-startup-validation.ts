import { logger } from "./shared/logger.js";
import { productionConfig, riskyConfig } from "./shared/config-runtime.js";
import { ConfigLoader } from "./module/config/config-loader.js";
import { ConfigValidator } from "./module/config/config-validator.js";

const loader = new ConfigLoader();
const validator = new ConfigValidator();

logger.info("Startup validation", {
  production: validator.validate(loader.load(productionConfig)),
  risky: validator.validate(loader.load(riskyConfig)),
});
