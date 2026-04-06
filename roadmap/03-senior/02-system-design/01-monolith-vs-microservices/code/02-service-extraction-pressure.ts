import { BoundaryAnalyzer } from "./module/analysis/boundary-analyzer.js";
import { candidateBoundaries } from "./shared/architecture-runtime.js";
import { logger } from "./shared/logger.js";

const analyzer = new BoundaryAnalyzer();

logger.section("Service Extraction Pressure");
for (const candidate of candidateBoundaries) {
  const decision = analyzer.decideExtraction(candidate);
  logger.line(`${candidate.name}: ${decision.recommendedArchitecture}`);
  for (const reason of decision.reasons) {
    logger.line(`- ${reason}`);
  }
}
