import { logger } from "./shared/logger.js";
import { appDatabaseSpec, riskyComposeSpec } from "./shared/compose-runtime.js";
import { NetworkingAdvisor } from "./module/compose/networking-advisor.js";

const advisor = new NetworkingAdvisor();

logger.info("Compose networking basics", {
  appDatabase: advisor.summarize(appDatabaseSpec),
  risky: advisor.summarize(riskyComposeSpec),
});
