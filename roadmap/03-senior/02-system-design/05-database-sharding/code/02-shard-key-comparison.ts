import { ShardKeyAnalyzer } from "./module/analysis/shard-key-analyzer.js";
import { shardKeyCandidates } from "./shared/sharding-runtime.js";
import { logger } from "./shared/logger.js";

const analyzer = new ShardKeyAnalyzer();

logger.section("Shard Key Comparison");
for (const line of analyzer.compare(shardKeyCandidates)) {
  logger.line(`- ${line}`);
}
logger.line(analyzer.recommend(shardKeyCandidates));
