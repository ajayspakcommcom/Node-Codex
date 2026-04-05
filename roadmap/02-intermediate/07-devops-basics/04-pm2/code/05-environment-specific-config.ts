import { logger } from "./shared/logger.js";
import { productionApiSpec, riskyPm2Spec } from "./shared/pm2-runtime.js";

logger.info("Environment-specific PM2 config", {
  production: productionApiSpec.apps.map((app) => ({
    name: app.name,
    env: app.env,
    envProduction: app.envProduction,
  })),
  risky: riskyPm2Spec.apps.map((app) => ({
    name: app.name,
    env: app.env,
    envProduction: app.envProduction,
  })),
});
