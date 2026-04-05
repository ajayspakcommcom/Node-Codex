import { AggregationPipelineRunner, topCostStages } from "./module/engine/pipeline-runner.js";
import { buildProductTagRevenuePipeline } from "./module/pipelines/reporting-pipelines.js";
import { exampleOrders, toDocuments } from "./shared/aggregation-runtime.js";
import { logger } from "./shared/logger.js";

const runner = new AggregationPipelineRunner();
const result = runner.run(
  "explainable product tag revenue",
  toDocuments(exampleOrders),
  buildProductTagRevenuePipeline("tenant_alpha"),
);

logger.info("Observability and explain-plan awareness", {
  totalCostUnits: result.totalCostUnits,
  explainStyleSummary: result.stageMetrics.map((metric) => ({
    stage: metric.name,
    kind: metric.kind,
    inputCount: metric.inputCount,
    outputCount: metric.outputCount,
    estimatedCostUnits: metric.estimatedCostUnits,
  })),
  hottestStages: topCostStages(result.stageMetrics, 2),
  guidance: "Important pipelines need explain-style visibility so teams can spot fan-out, large sorts, and other hot stages before latency or memory pressure becomes a production issue.",
});
