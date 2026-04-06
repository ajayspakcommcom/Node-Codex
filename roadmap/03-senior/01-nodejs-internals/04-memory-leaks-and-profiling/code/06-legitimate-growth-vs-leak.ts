import { RetentionAnalyzer } from "./module/analysis/retention-analyzer.js";
import { logger } from "./shared/logger.js";

const analyzer = new RetentionAnalyzer();

const boundedGrowth = {
  name: "bounded-report-cache",
  retainedObjects: 40,
  growthTrend: "stable" as const,
  bounded: true,
};

const leakingGrowth = {
  name: "session-map-without-eviction",
  retainedObjects: 220,
  growthTrend: "growing" as const,
  bounded: false,
};

logger.info("Legitimate growth vs leak", {
  boundedGrowth: analyzer.assess(boundedGrowth),
  leakingGrowth: analyzer.assess(leakingGrowth),
});
