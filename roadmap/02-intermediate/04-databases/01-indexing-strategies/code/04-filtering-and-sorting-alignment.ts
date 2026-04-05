import { QueryAnalyzer } from "./module/analyzers/query-analyzer.js";
import { IndexRegistry } from "./module/registry/index-registry.js";
import { exampleIndexes, exampleQueries } from "./shared/indexing-runtime.js";
import { logger } from "./shared/logger.js";

const queryAnalyzer = new QueryAnalyzer(new IndexRegistry(exampleIndexes));
const catalogQuery = exampleQueries.find((query) => query.name === "Catalog page by category sorted by price");

if (catalogQuery === undefined) {
  throw new Error("Catalog query example is missing.");
}

logger.info("Filtering and sorting alignment", {
  query: catalogQuery,
  plan: queryAnalyzer.explain(catalogQuery),
  guidance: "When endpoints filter and sort together, indexing should consider both concerns instead of optimizing only the filter predicate.",
});
