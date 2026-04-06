import { RetentionAnalyzer } from "./module/analysis/retention-analyzer.js";
import { retentionExamples } from "./shared/memory-runtime.js";
import { logger } from "./shared/logger.js";

const analyzer = new RetentionAnalyzer();

logger.info("Retained reference analysis", {
  subjects: retentionExamples.map((subject) => ({
    subject,
    assessment: analyzer.assess(subject),
  })),
});
