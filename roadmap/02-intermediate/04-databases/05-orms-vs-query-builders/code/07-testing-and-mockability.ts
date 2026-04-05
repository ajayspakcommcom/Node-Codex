import { logger } from "./shared/logger.js";

const testableBoundary = {
  repositoryContract: "loadOrderSummary(orderId)",
  serviceBenefit: "The service can be tested against a simple fake repository without depending on ORM entities or builder APIs.",
};

const hardToTestBoundary = {
  repositoryContract: "returns ORM entity with framework-specific lazy behavior",
  serviceRisk: "Business tests now depend on persistence-tool semantics instead of only business outcomes.",
};

logger.info("Testing and mockability", {
  testableBoundary,
  hardToTestBoundary,
  guidance: "Persistence abstractions stay maintainable when tests can substitute the repository without dragging the entire data-access framework into service logic.",
});
