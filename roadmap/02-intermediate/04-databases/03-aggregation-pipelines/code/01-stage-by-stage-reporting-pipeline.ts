import { AggregationPipelineRunner } from "./module/engine/pipeline-runner.js";
import { buildTenantRevenueByCategoryPipeline } from "./module/pipelines/reporting-pipelines.js";
import { exampleOrders, toDocuments } from "./shared/aggregation-runtime.js";
import { logger } from "./shared/logger.js";

const runner = new AggregationPipelineRunner();
const result = runner.run(
  "tenant revenue by category",
  toDocuments(exampleOrders),
  buildTenantRevenueByCategoryPipeline("tenant_alpha"),
);

logger.info("Stage-by-stage reporting pipeline", {
  stageMetrics: result.stageMetrics,
  output: result.output,
  totalCostUnits: result.totalCostUnits,
  guidance: "Enterprise teams review pipeline behavior stage by stage so they can explain both correctness and cost.",
});
