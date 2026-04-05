import { QueryAnalyzer } from "./module/analyzers/query-analyzer.js";
import { IndexRegistry } from "./module/registry/index-registry.js";
import { exampleIndexes, exampleQueries } from "./shared/indexing-runtime.js";
import { logger } from "./shared/logger.js";

const queryAnalyzer = new QueryAnalyzer(new IndexRegistry(exampleIndexes));

logger.info("Observability and query plans", {
  executionPlanSnapshots: exampleQueries.map((query) => queryAnalyzer.explain(query)),
  monitoringChecklist: [
    "Track slow query patterns over time.",
    "Compare execution plans before and after index changes.",
    "Review scan-heavy queries under realistic production row counts.",
    "Watch for write regressions after adding new indexes.",
  ],
  guidance: "Enterprise indexing decisions should be validated with plan evidence and workload metrics rather than relying on intuition alone.",
});
