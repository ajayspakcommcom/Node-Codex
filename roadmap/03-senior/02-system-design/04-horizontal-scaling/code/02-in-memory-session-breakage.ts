import { SharedStateService } from "./module/services/shared-state-service.js";
import { replicas } from "./shared/horizontal-scaling-runtime.js";
import { logger } from "./shared/logger.js";

const service = new SharedStateService();

logger.section("In-Memory Session Breakage");
for (const line of service.evaluateSessionSafety(replicas)) {
  logger.line(`- ${line}`);
}
