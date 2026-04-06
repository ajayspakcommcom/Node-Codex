import { RetentionAnalyzer } from "./module/analysis/retention-analyzer.js";
import { logger } from "./shared/logger.js";

const analyzer = new RetentionAnalyzer();

const subject = {
  name: "request-cache-without-cleanup",
  retainedObjects: 180,
  growthTrend: "growing" as const,
  bounded: false,
};

logger.warn("Request scoped data leak", {
  subject,
  assessment: analyzer.assess(subject),
  takeaway: "request scoped objects should not remain reachable after request completion.",
});
