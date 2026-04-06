import { RebalancingService } from "./module/services/rebalancing-service.js";
import { rebalancingEvents } from "./shared/sharding-runtime.js";
import { logger } from "./shared/logger.js";

const service = new RebalancingService();

logger.section("Rebalancing And Data Movement");
for (const line of service.summarize(rebalancingEvents)) {
  logger.line(`- ${line}`);
}
for (const line of service.advice()) {
  logger.line(`- ${line}`);
}
