import { logger } from "./shared/logger.js";
import { appDatabaseSpec, appRedisWorkerSpec, riskyComposeSpec } from "./shared/compose-runtime.js";
import { EnvironmentCoordinationAdvisor } from "./module/compose/environment-coordination-advisor.js";

const advisor = new EnvironmentCoordinationAdvisor();

logger.info("Environment variable coordination", {
  appDatabase: advisor.compare(appDatabaseSpec),
  appRedisWorker: advisor.compare(appRedisWorkerSpec),
  risky: advisor.compare(riskyComposeSpec),
});
