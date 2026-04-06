import { candidateBoundaries } from "./shared/architecture-runtime.js";
import { logger } from "./shared/logger.js";

logger.section("Data Consistency Tradeoff");
for (const candidate of candidateBoundaries) {
  logger.line(
    `${candidate.name}: shared data touches = ${candidate.sharedDataTouches.length}`,
  );
}
logger.line("Senior rule: if extraction turns local consistency into distributed coordination, count that cost explicitly.");
