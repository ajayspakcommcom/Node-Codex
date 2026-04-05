import { logger } from "./shared/logger.js";

const simpleQueryUseCase = {
  problem: "List placed orders for one tenant with a few fields for an admin grid.",
  betterChoice: "simple-query",
  reason: "A filtered find with projection and sort is enough. Grouping and reshaping are not required.",
};

const aggregationUseCase = {
  problem: "Build daily revenue totals by region and channel for a dashboard.",
  betterChoice: "aggregation",
  reason: "This requires summarization and reshaping rather than returning matching documents directly.",
};

logger.info("Simple query vs aggregation decision", {
  simpleQueryUseCase,
  aggregationUseCase,
  guidance: "Enterprise teams should keep straightforward retrieval on simple queries and reserve aggregation for real transformation or reporting needs.",
});
