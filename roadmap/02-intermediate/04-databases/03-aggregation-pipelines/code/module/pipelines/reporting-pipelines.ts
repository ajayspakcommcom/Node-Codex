import {
  filterStage,
  groupStage,
  lookupStage,
  paginateStage,
  projectStage,
  sortStage,
  unwindStage,
  type PipelineStage,
} from "../engine/pipeline-runner.js";
import { exampleProductTags, exampleProducts, toDocuments } from "../../shared/aggregation-runtime.js";

export function buildTenantRevenueByCategoryPipeline(tenantId: string): readonly PipelineStage[] {
  return [
    filterStage(
      "Match tenant and completed orders",
      (document) => document.tenantId === tenantId && document.status === "placed",
      "Reduce the working set before any expensive aggregation work.",
    ),
    projectStage(
      "Project revenue fields only",
      ["category", "totalInCents", "units", "salesChannel", "createdAt"],
      "Carry only the fields the report actually needs.",
    ),
    groupStage(
      "Group by category",
      (document) => String(document.category),
      (key, documents) => ({
        category: key,
        orderCount: documents.length,
        units: documents.reduce((sum, document) => sum + Number(document.units), 0),
        revenueInCents: documents.reduce((sum, document) => sum + Number(document.totalInCents), 0),
      }),
      "Summarize the working set into report-level rows.",
    ),
    sortStage(
      "Sort by revenue descending",
      (left, right) => Number(right.revenueInCents) - Number(left.revenueInCents),
      "Apply ordering after the grouping stage has reduced the dataset.",
    ),
  ];
}

export function buildDailyRevenueByChannelPipeline(tenantId: string): readonly PipelineStage[] {
  return [
    filterStage(
      "Filter active tenant orders",
      (document) => document.tenantId === tenantId && document.status === "placed",
      "Keep only the report's tenant and successful orders.",
    ),
    projectStage(
      "Project day and channel",
      ["createdAt", "salesChannel", "totalInCents"],
      "Trim wide order records into the fields needed for time-series reporting.",
    ),
    groupStage(
      "Group by day and channel",
      (document) => `${String(document.createdAt).slice(0, 10)}|${String(document.salesChannel)}`,
      (key, documents) => {
        const [day, salesChannel] = key.split("|");

        return {
          day,
          salesChannel,
          orderCount: documents.length,
          revenueInCents: documents.reduce((sum, document) => sum + Number(document.totalInCents), 0),
        };
      },
      "Build a compact reporting model suitable for dashboards.",
    ),
    sortStage(
      "Sort by day and channel",
      (left, right) =>
        String(left.day).localeCompare(String(right.day)) || String(left.salesChannel).localeCompare(String(right.salesChannel)),
      "Sort after reduction so expensive ordering work happens on fewer rows.",
    ),
  ];
}

export function buildProductTagRevenuePipeline(tenantId: string): readonly PipelineStage[] {
  return [
    filterStage(
      "Filter placed orders for one tenant",
      (document) => document.tenantId === tenantId && document.status === "placed",
      "Early filtering limits the amount of data reaching join-like stages.",
    ),
    groupStage(
      "Group revenue by product",
      (document) => String(document.productId),
      (key, documents) => ({
        productId: key,
        orderCount: documents.length,
        revenueInCents: documents.reduce((sum, document) => sum + Number(document.totalInCents), 0),
      }),
      "Reduce many order rows before enrichment.",
    ),
    lookupStage(
      "Lookup product details",
      toDocuments(exampleProducts),
      "productId",
      "id",
      "product",
      "Join product metadata after reduction.",
    ),
    unwindStage(
      "Unwind product",
      "product",
      "One product match should keep row count stable here.",
    ),
    lookupStage(
      "Lookup product tags",
      toDocuments(exampleProductTags),
      "productId",
      "productId",
      "tags",
      "This stage can multiply rows later if the tags array is unwound.",
    ),
    unwindStage(
      "Unwind tags",
      "tags",
      "This unwind demonstrates fan-out because a single product can map to multiple tags.",
    ),
    projectStage(
      "Project report output",
      ["productId", "orderCount", "revenueInCents", "product", "tags"],
      "Keep the final response focused even after enrichment.",
    ),
  ];
}

export function buildExpensiveLiveDashboardPipeline(tenantId: string): readonly PipelineStage[] {
  return [
    filterStage(
      "Filter tenant orders",
      (document) => document.tenantId === tenantId,
      "Keep the analysis tenant-scoped.",
    ),
    lookupStage(
      "Lookup customer profiles",
      [],
      "customerId",
      "id",
      "customers",
      "Placeholder stage representing additional enrichment cost for a dashboard workload.",
    ),
    projectStage(
      "Project wide dashboard fields",
      ["category", "region", "salesChannel", "createdAt", "totalInCents", "units"],
      "The dashboard still carries several dimensions for later grouping.",
    ),
    groupStage(
      "Group by region, channel, and category",
      (document) => `${String(document.region)}|${String(document.salesChannel)}|${String(document.category)}`,
      (key, documents) => {
        const [region, salesChannel, category] = key.split("|");

        return {
          region,
          salesChannel,
          category,
          orderCount: documents.length,
          revenueInCents: documents.reduce((sum, document) => sum + Number(document.totalInCents), 0),
          units: documents.reduce((sum, document) => sum + Number(document.units), 0),
        };
      },
      "Multi-dimensional grouping can be useful, but it is not free at scale.",
    ),
    sortStage(
      "Sort by revenue descending",
      (left, right) => Number(right.revenueInCents) - Number(left.revenueInCents),
      "Order the aggregated result for dashboard display.",
    ),
    paginateStage(
      "Take top dashboard rows",
      0,
      10,
      "Paginate after aggregation so the consumer gets only the top summaries.",
    ),
  ];
}
