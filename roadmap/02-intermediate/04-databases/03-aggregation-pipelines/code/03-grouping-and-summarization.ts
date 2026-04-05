import { AggregationPipelineRunner } from "./module/engine/pipeline-runner.js";
import { buildDailyRevenueByChannelPipeline } from "./module/pipelines/reporting-pipelines.js";
import { exampleOrders, toDocuments } from "./shared/aggregation-runtime.js";
import { logger } from "./shared/logger.js";

const runner = new AggregationPipelineRunner();
const result = runner.run(
  "daily revenue by channel",
  toDocuments(exampleOrders),
  buildDailyRevenueByChannelPipeline("tenant_alpha"),
);

logger.info("Grouping and summarization", {
  summaryRows: result.output,
  stageMetrics: result.stageMetrics,
  guidance: "Grouping is often the core of reporting pipelines, so enterprise teams validate both the business dimensions and the cost of the grouped workload.",
});
