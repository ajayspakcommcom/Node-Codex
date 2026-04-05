import { logger } from "./shared/logger.js";
import { appDatabaseSpec, appRedisWorkerSpec, riskyComposeSpec } from "./shared/compose-runtime.js";
import { DependencyAdvisor } from "./module/compose/dependency-advisor.js";

const advisor = new DependencyAdvisor();

logger.warn("Readiness and dependency anti-patterns", {
  appDatabase: advisor.assess(appDatabaseSpec),
  appRedisWorker: advisor.assess(appRedisWorkerSpec),
  risky: advisor.assess(riskyComposeSpec),
});
