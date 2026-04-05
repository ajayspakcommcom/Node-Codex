import { QueryAnalyzer } from "./module/analyzers/query-analyzer.js";
import { IndexRegistry } from "./module/registry/index-registry.js";
import { exampleIndexes, exampleQueries } from "./shared/indexing-runtime.js";
import { logger } from "./shared/logger.js";

const queryAnalyzer = new QueryAnalyzer(new IndexRegistry(exampleIndexes));
const joinQuery = exampleQueries.find((query) => query.name === "Join order and line items");

if (joinQuery === undefined) {
  throw new Error("Join query example is missing.");
}

logger.info("Join-key indexing", {
  query: joinQuery,
  plan: queryAnalyzer.explain(joinQuery),
  guidance: "Relational queries often depend on indexes for the columns used to join tables. Missing join-key support becomes painful as row counts grow.",
});
