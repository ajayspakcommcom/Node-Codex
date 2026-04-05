import {
  AggregationPipelineRunner,
  filterStage,
  paginateStage,
  sortStage,
} from "./module/engine/pipeline-runner.js";
import { buildTenantRevenueByCategoryPipeline } from "./module/pipelines/reporting-pipelines.js";
import { exampleOrders, toDocuments } from "./shared/aggregation-runtime.js";
import { logger } from "./shared/logger.js";

const runner = new AggregationPipelineRunner();
const input = toDocuments(exampleOrders);

const wellOrdered = runner.run(
  "sort after reduction",
  input,
  [...buildTenantRevenueByCategoryPipeline("tenant_alpha"), paginateStage("Take top categories", 0, 2, "Return only the top rows after sorting the reduced report output.")],
);

const earlySort = runner.run("sort too early", input, [
  filterStage(
    "Filter tenant rows",
    (document) => document.tenantId === "tenant_alpha" && document.status === "placed",
    "Limit the query to relevant tenant rows.",
  ),
  sortStage(
    "Sort raw order rows by revenue",
    (left, right) => Number(right.totalInCents) - Number(left.totalInCents),
    "Sorting raw rows before reduction is usually more expensive.",
  ),
  paginateStage(
    "Paginate raw rows",
    0,
    5,
    "Paginating before the business summary can distort what the report actually means.",
  ),
]);

logger.info("Sorting and pagination awareness", {
  wellOrderedTotalCost: wellOrdered.totalCostUnits,
  earlySortTotalCost: earlySort.totalCostUnits,
  wellOrderedStageMetrics: wellOrdered.stageMetrics,
  earlySortStageMetrics: earlySort.stageMetrics,
  guidance: "Sort and paginate after meaningful reduction when the report needs summaries rather than a random slice of the raw input.",
});
