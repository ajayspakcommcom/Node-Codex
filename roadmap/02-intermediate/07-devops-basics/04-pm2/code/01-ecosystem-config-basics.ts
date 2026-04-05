import { logger } from "./shared/logger.js";
import { productionApiSpec } from "./shared/pm2-runtime.js";
import { renderEcosystem } from "./module/pm2/ecosystem-renderer.js";

logger.info("PM2 ecosystem config basics", {
  ecosystem: renderEcosystem(productionApiSpec),
});
