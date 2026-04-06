import { createLogger } from "./shared/logger.js";

const logger = createLogger("ddd");

logger.info("ddd_maintainability_policy", {
  policy: {
    domainModelsMustNotDependOnTransport: true,
    foreignContractsStayBehindAcl: true,
    aggregateInvariantsLiveInsideAggregate: true,
    repositoriesReturnDomainModels: true,
  },
});
