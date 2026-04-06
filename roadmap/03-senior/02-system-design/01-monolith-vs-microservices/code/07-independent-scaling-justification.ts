import { ExtractionAdvisor } from "./module/services/extraction-advisor.js";
import {
  candidateBoundaries,
  commerceModules,
} from "./shared/architecture-runtime.js";
import { logger } from "./shared/logger.js";

const advisor = new ExtractionAdvisor();
const decision = advisor.recommendArchitecture(commerceModules, candidateBoundaries);

logger.section("Independent Scaling Justification");
logger.line(`Recommendation: ${decision.recommendedArchitecture}`);
for (const reason of decision.reasons) {
  logger.line(`- ${reason}`);
}
