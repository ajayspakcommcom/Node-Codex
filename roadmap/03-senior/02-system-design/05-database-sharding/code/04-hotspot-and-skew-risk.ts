import { HotspotAnalyzer } from "./module/analysis/hotspot-analyzer.js";
import { shardNodes } from "./shared/sharding-runtime.js";
import { logger } from "./shared/logger.js";

const analyzer = new HotspotAnalyzer();
const result = analyzer.summarize(shardNodes);

logger.section("Hotspot And Skew Risk");
logger.line(`Hottest shard: ${result.hottestShard}`);
logger.line(`Hotspot risk: ${result.hotspotRisk}`);
for (const observation of result.observations) {
  logger.line(`- ${observation}`);
}
