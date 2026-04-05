import { logger } from "./shared/logger.js";
import { productionApiSpec, riskyPm2Spec } from "./shared/pm2-runtime.js";

logger.info("Restart policy tradeoffs", {
  production: productionApiSpec.apps.map((app) => ({
    name: app.name,
    autorestart: app.autorestart,
    maxRestarts: app.maxRestarts,
  })),
  risky: riskyPm2Spec.apps.map((app) => ({
    name: app.name,
    autorestart: app.autorestart,
    maxRestarts: app.maxRestarts,
  })),
  rule: "Restart support should improve resilience without hiding crash loops or application instability.",
});
