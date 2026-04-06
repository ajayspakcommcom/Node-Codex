import { createLogger } from "./shared/logger.js";

const logger = createLogger("memory-gc-tuning");

logger.info("memory_policy_defined", {
  policy: {
    boundedCachesRequired: true,
    runtimeFlagChangesNeedEvidence: true,
    memoryIncidentsNeedRetentionReview: true,
  },
});
