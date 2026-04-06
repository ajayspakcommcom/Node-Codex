import { CrossShardCostService } from "./module/services/cross-shard-cost-service.js";
import { logger } from "./shared/logger.js";

const service = new CrossShardCostService();

logger.section("Cross-Shard Transaction Risk");
logger.line(service.transactionRisk());
