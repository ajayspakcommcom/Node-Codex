import { logger } from "./shared/logger.js";
import { productionApiSpec } from "./shared/pm2-runtime.js";
import { renderEcosystem } from "./module/pm2/ecosystem-renderer.js";

logger.info("PM2 maintainability patterns", {
  patterns: [
    "keep the ecosystem config versioned and readable",
    "separate development and production env settings clearly",
    "make cluster usage intentional rather than default",
    "define stdout and stderr log locations explicitly",
  ],
  ecosystemPreview: renderEcosystem(productionApiSpec),
});
