import { QueryAnalyzer } from "./module/analyzers/query-analyzer.js";
import { IndexRegistry } from "./module/registry/index-registry.js";
import { exampleIndexes, exampleQueries } from "./shared/indexing-runtime.js";
import { logger } from "./shared/logger.js";

const queryAnalyzer = new QueryAnalyzer(new IndexRegistry(exampleIndexes));
const catalogQuery = exampleQueries.find((query) => query.name === "Catalog page by category sorted by price");
const coveringIndex = exampleIndexes.find((index) => index.name === "idx_products_category_price");

if (catalogQuery === undefined || coveringIndex === undefined) {
  throw new Error("Required covering index example is missing.");
}

logger.info("Covering index awareness", {
  query: catalogQuery.name,
  coveringAssessment: queryAnalyzer.describeCoveringPotential(catalogQuery, coveringIndex.includes),
  guidance: "A covering-style index can reduce extra lookups, but teams should avoid bloating indexes without a clear performance reason.",
});
