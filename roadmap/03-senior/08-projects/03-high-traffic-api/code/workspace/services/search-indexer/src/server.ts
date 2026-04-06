import { type SearchRefreshRequest } from "@platform/contracts/feed-api";
import { createLogger } from "@platform/observability/logger";

const logger = createLogger("search-indexer");

async function refreshCategoryIndex(request: SearchRefreshRequest): Promise<void> {
  logger.info("search_index_refresh_started", {
    category: request.category,
    reason: request.reason,
  });

  logger.info("search_index_refresh_completed", {
    category: request.category,
  });
}

void refreshCategoryIndex({
  category: "electronics",
  reason: "feed_cache_miss",
});
