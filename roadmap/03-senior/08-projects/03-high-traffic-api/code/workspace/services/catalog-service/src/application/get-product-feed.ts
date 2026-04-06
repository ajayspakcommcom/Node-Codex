import { type ProductFeedRequest, type ProductFeedResponse } from "@platform/contracts/feed-api";
import { createLogger } from "@platform/observability/logger";

const logger = createLogger("catalog-service");

interface DatabasePool {
  readonly maxConnections: number;
  readonly activeConnections: number;
}

export async function getProductFeed(
  request: ProductFeedRequest,
  pool: DatabasePool,
): Promise<ProductFeedResponse> {
  logger.info("catalog_feed_query_started", {
    region: request.region,
    category: request.category,
    activeConnections: pool.activeConnections,
    maxConnections: pool.maxConnections,
  });

  if (pool.activeConnections >= pool.maxConnections) {
    throw new Error("dependency saturation detected");
  }

  return {
    items: [
      {
        sku: "sku_traffic_1",
        title: "Noise Cancelling Headphones",
        priceInCents: 14999,
        available: true,
      },
      {
        sku: "sku_traffic_2",
        title: "Mechanical Keyboard",
        priceInCents: 8999,
        available: true,
      },
    ],
    metadata: {
      region: request.region,
      category: request.category,
      page: request.page,
      pageSize: request.pageSize,
      cacheStatus: "miss",
    },
  };
}
