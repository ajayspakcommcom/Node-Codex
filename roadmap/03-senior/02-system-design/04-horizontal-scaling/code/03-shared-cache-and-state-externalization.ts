import { SharedStateService } from "./module/services/shared-state-service.js";
import { sharedDependencies } from "./shared/horizontal-scaling-runtime.js";
import { logger } from "./shared/logger.js";

const service = new SharedStateService();

logger.section("Shared Cache And State Externalization");
for (const line of service.evaluateDependencyPressure(sharedDependencies)) {
  logger.line(`- ${line}`);
}
