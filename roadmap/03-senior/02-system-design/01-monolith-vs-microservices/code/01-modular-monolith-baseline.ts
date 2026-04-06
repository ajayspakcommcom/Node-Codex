import { ModularMonolithService } from "./module/services/modular-monolith-service.js";
import { commerceModules } from "./shared/architecture-runtime.js";
import { logger } from "./shared/logger.js";

const service = new ModularMonolithService();

logger.section("Modular Monolith Baseline");
for (const note of service.assessFitness(commerceModules)) {
  logger.line(`- ${note}`);
}
