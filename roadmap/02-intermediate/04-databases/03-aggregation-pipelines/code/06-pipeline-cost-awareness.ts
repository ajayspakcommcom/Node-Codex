import { AggregationPipelineRunner, topCostStages } from "./module/engine/pipeline-runner.js";
import { buildExpensiveLiveDashboardPipeline } from "./module/pipelines/reporting-pipelines.js";
import { exampleOrders, toDocuments } from "./shared/aggregation-runtime.js";
import { logger } from "./shared/logger.js";

const runner = new AggregationPipelineRunner();
const result = runner.run(
  "expensive live dashboard",
  toDocuments(exampleOrders),
  buildExpensiveLiveDashboardPipeline("tenant_alpha"),
);

logger.info("Pipeline cost awareness", {
  totalCostUnits: result.totalCostUnits,
  stageMetrics: result.stageMetrics,
  highestCostStages: topCostStages(result.stageMetrics, 3),
  guidance: "Enterprise review should identify which stages dominate cost instead of treating the whole pipeline as one black box.",
});
