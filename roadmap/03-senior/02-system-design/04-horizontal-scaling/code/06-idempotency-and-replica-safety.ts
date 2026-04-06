import { DuplicateWorkService } from "./module/services/duplicate-work-service.js";
import { workItems } from "./shared/horizontal-scaling-runtime.js";
import { logger } from "./shared/logger.js";

const service = new DuplicateWorkService();

logger.section("Idempotency And Replica Safety");
for (const line of service.explainIdempotency(workItems)) {
  logger.line(`- ${line}`);
}
