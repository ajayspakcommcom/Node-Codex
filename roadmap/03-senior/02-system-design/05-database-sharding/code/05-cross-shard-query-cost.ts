import { CrossShardCostService } from "./module/services/cross-shard-cost-service.js";
import { queryPatterns } from "./shared/sharding-runtime.js";
import { logger } from "./shared/logger.js";

const service = new CrossShardCostService();

logger.section("Cross-Shard Query Cost");
for (const line of service.analyze(queryPatterns)) {
  logger.line(`- ${line}`);
}
