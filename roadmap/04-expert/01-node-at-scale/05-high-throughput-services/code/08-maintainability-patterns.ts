import { createLogger } from "./shared/logger.js";

const logger = createLogger("high-throughput-services");

logger.info("throughput_policy_defined", {
  policy: {
    rejectionIsAcceptable: true,
    unboundedInMemoryQueuesForbidden: true,
    dependencyConcurrencyLimitsRequired: true,
  },
});
