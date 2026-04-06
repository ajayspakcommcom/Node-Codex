import { createLogger } from "./shared/logger.js";

const logger = createLogger("cqrs");

logger.info("cqrs_maintainability_policy", {
  policy: {
    readModelsMustNotOwnInvariants: true,
    projectionLagMustBeObservable: true,
    cqrsRequiresAJustifiedReadWriteMismatch: true,
  },
});
