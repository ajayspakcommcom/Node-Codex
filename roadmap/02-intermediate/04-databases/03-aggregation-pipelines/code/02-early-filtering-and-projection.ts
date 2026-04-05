import {
  AggregationPipelineRunner,
  filterStage,
  groupStage,
  projectStage,
  sortStage,
} from "./module/engine/pipeline-runner.js";
import { exampleOrders, toDocuments } from "./shared/aggregation-runtime.js";
import { logger } from "./shared/logger.js";

const runner = new AggregationPipelineRunner();
const input = toDocuments(exampleOrders);

const optimizedResult = runner.run("optimized pipeline", input, [
  filterStage(
    "Filter tenant and placed orders",
    (document) => document.tenantId === "tenant_alpha" && document.status === "placed",
    "Reduce the dataset before transformation-heavy stages.",
  ),
  projectStage(
    "Project minimal fields",
    ["category", "totalInCents"],
    "Remove unused fields before grouping.",
  ),
  groupStage(
    "Group by category",
    (document) => String(document.category),
    (key, documents) => ({
      category: key,
      revenueInCents: documents.reduce((sum, document) => sum + Number(document.totalInCents), 0),
    }),
    "Aggregate only the trimmed working set.",
  ),
  sortStage(
    "Sort grouped output",
    (left, right) => Number(right.revenueInCents) - Number(left.revenueInCents),
    "Sort after reduction.",
  ),
]);

const lateFilterResult = runner.run("late filter anti-pattern", input, [
  projectStage(
    "Carry many fields early",
    ["tenantId", "status", "category", "totalInCents", "units", "region", "salesChannel", "createdAt", "productId"],
    "This still leaves more work for later stages than necessary.",
  ),
  groupStage(
    "Group before reducing noise",
    (document) => `${String(document.tenantId)}|${String(document.status)}|${String(document.category)}`,
    (key, documents) => ({
      key,
      revenueInCents: documents.reduce((sum, document) => sum + Number(document.totalInCents), 0),
    }),
    "Grouping before precise filtering creates avoidable processing cost.",
  ),
  filterStage(
    "Filter after expensive work",
    (document) => String(document.key).startsWith("tenant_alpha|placed|"),
    "The correct answer can still appear, but it costs more to get there.",
  ),
]);

logger.info("Early filtering and projection", {
  optimizedTotalCost: optimizedResult.totalCostUnits,
  lateFilterTotalCost: lateFilterResult.totalCostUnits,
  optimizedStageMetrics: optimizedResult.stageMetrics,
  lateFilterStageMetrics: lateFilterResult.stageMetrics,
  guidance: "Filtering and projection are most valuable when they shrink the working set before expensive grouping or sorting stages.",
});
