import { RuntimeSeparationService } from "./module/services/runtime-separation-service.js";
import { logger } from "./shared/logger.js";

async function main(): Promise<void> {
  const service = new RuntimeSeparationService();
  const result = await service.compareAsyncRuntimeVsSyncCpu();

  logger.info("I/O vs CPU bound distinction", {
    result,
    takeaway: "async runtime work and synchronous CPU work affect responsiveness in different ways.",
  });
}

void main();
