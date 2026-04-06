import { AutoscalingSignalAnalyzer } from "./module/analysis/autoscaling-signal-analyzer.js";
import { scalingSignals } from "./shared/horizontal-scaling-runtime.js";
import { logger } from "./shared/logger.js";

const analyzer = new AutoscalingSignalAnalyzer();

logger.section("Autoscaling Signal Discipline");
for (const line of analyzer.summarize(scalingSignals)) {
  logger.line(`- ${line}`);
}
logger.line(analyzer.recommend(scalingSignals));
