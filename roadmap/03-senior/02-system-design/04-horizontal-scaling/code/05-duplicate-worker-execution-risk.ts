import { DuplicateWorkService } from "./module/services/duplicate-work-service.js";
import { replicas, workItems } from "./shared/horizontal-scaling-runtime.js";
import { logger } from "./shared/logger.js";

const service = new DuplicateWorkService();

logger.section("Duplicate Worker Execution Risk");
for (const line of service.simulateWithoutCoordination(workItems, replicas.length)) {
  logger.line(`- ${line}`);
}
