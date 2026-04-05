import { buildDailyRevenueByChannelPipeline } from "./module/pipelines/reporting-pipelines.js";
import { logger } from "./shared/logger.js";

const readableStageNames = buildDailyRevenueByChannelPipeline("tenant_alpha").map((stage) => stage.name);
const antiPatternStageNames = ["stage1", "stage2", "stage3", "stage4"];

logger.info("Readability with named stages", {
  readableStageNames,
  antiPatternStageNames,
  guidance: "Named stages make complex pipelines reviewable. Enterprise teams should be able to explain the purpose of each stage without reverse-engineering anonymous chains.",
});
