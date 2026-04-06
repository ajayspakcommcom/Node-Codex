import { createLogger } from "@platform/observability/logger";
import { getProductFeed } from "./application/get-product-feed.js";

const logger = createLogger("catalog-service");

void getProductFeed(
  {
    region: "in",
    category: "electronics",
    page: 1,
    pageSize: 20,
  },
  {
    maxConnections: 80,
    activeConnections: 34,
  },
).then((response) => {
  logger.info("catalog_feed_query_completed", {
    itemCount: response.items.length,
    cacheStatus: response.metadata.cacheStatus,
  });
});
