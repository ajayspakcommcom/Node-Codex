import { QueryAnalyzer } from "./module/analyzers/query-analyzer.js";
import { IndexRegistry } from "./module/registry/index-registry.js";
import { exampleIndexes, exampleQueries } from "./shared/indexing-runtime.js";
import { logger } from "./shared/logger.js";

const queryAnalyzer = new QueryAnalyzer(new IndexRegistry(exampleIndexes));
const explanations = exampleQueries.map((query) => queryAnalyzer.explain(query));

logger.info("Query shape and index fit", {
  explanations,
  guidance: "Enterprise indexing starts with real query shape. An index is only useful when its leading structure matches how the query filters and sorts data.",
});
