import { MaterializationAdvisor } from "./module/advisors/materialization-advisor.js";
import { AggregationPipelineRunner } from "./module/engine/pipeline-runner.js";
import { buildExpensiveLiveDashboardPipeline } from "./module/pipelines/reporting-pipelines.js";
import { ReportingService } from "./module/services/reporting-service.js";
import { exampleOrders, materializedRevenueByCategory, toDocuments } from "./shared/aggregation-runtime.js";
import { logger } from "./shared/logger.js";

const reportingService = new ReportingService(new AggregationPipelineRunner(), new MaterializationAdvisor());
const assessment = reportingService.runReport(
  "live dashboard revenue",
  toDocuments(exampleOrders),
  buildExpensiveLiveDashboardPipeline("tenant_alpha"),
  120,
 15,
);

logger.info("Live aggregation vs materialized view", {
  totalCostUnits: assessment.result.totalCostUnits,
  materializationAssessment: assessment.materializationAssessment,
  exampleMaterializedRows: materializedRevenueByCategory,
  guidance: "If an expensive summary is requested frequently and can tolerate slightly stale data, a materialized view or precomputed read model is often the better enterprise choice.",
});
