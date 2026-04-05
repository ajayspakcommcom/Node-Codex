import { logger } from "./shared/logger.js";
import { appDatabaseSpec, appRedisWorkerSpec, riskyComposeSpec } from "./shared/compose-runtime.js";
import { VolumeStrategyAdvisor } from "./module/compose/volume-strategy-advisor.js";

const advisor = new VolumeStrategyAdvisor();

logger.info("Volume and reset strategy", {
  appDatabase: advisor.assess(appDatabaseSpec),
  appRedisWorker: advisor.assess(appRedisWorkerSpec),
  risky: advisor.assess(riskyComposeSpec),
});
