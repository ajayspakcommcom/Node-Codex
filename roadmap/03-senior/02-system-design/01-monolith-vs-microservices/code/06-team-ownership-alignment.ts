import { commerceModules } from "./shared/architecture-runtime.js";
import { logger } from "./shared/logger.js";

logger.section("Team Ownership Alignment");
for (const module of commerceModules) {
  logger.line(`${module.name} -> owned by ${module.ownedBy}`);
}
logger.line("Senior rule: boundaries should make ownership clearer, not blur responsibility across teams.");
