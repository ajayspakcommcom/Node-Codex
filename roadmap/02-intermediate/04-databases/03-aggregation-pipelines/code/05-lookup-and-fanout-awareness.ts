import { AggregationPipelineRunner } from "./module/engine/pipeline-runner.js";
import { buildProductTagRevenuePipeline } from "./module/pipelines/reporting-pipelines.js";
import { exampleOrders, toDocuments } from "./shared/aggregation-runtime.js";
import { logger } from "./shared/logger.js";

const runner = new AggregationPipelineRunner();
const result = runner.run(
  "product revenue with tags",
  toDocuments(exampleOrders),
  buildProductTagRevenuePipeline("tenant_alpha"),
);

logger.warn("Lookup and fan-out awareness", {
  stageMetrics: result.stageMetrics,
  outputSample: result.output.slice(0, 5),
  guidance: "Lookups may be safe after reduction, but unwinding one-to-many relationships can still multiply the output and become the dominant cost driver.",
});
