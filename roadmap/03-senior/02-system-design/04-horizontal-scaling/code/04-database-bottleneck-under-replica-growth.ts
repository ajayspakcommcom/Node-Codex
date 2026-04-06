import { ScalingBottleneckAnalyzer } from "./module/analysis/scaling-bottleneck-analyzer.js";
import {
  replicas,
  sharedDependencies,
} from "./shared/horizontal-scaling-runtime.js";
import { logger } from "./shared/logger.js";

const analyzer = new ScalingBottleneckAnalyzer();
const dependencyAnalysis = analyzer.analyzeDependencies(sharedDependencies);

logger.section("Database Bottleneck Under Replica Growth");
for (const line of analyzer.analyzeReplicas(replicas)) {
  logger.line(`- ${line}`);
}
logger.line(`Dominant constraint: ${dependencyAnalysis.dominantConstraint}`);
for (const observation of dependencyAnalysis.observations) {
  logger.line(`- ${observation}`);
}
