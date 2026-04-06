import { GatewayBottleneckAnalyzer } from "./module/analysis/gateway-bottleneck-analyzer.js";
import { gatewayLoadProfiles } from "./shared/gateway-runtime.js";
import { logger } from "./shared/logger.js";

const analyzer = new GatewayBottleneckAnalyzer();

logger.section("Central Bottleneck Risk");
for (const profile of gatewayLoadProfiles) {
  const result = analyzer.analyzeLoad(profile);
  logger.line(`Risk: ${result.bottleneckRisk}`);
  for (const observation of result.observations) {
    logger.line(`- ${observation}`);
  }
}
