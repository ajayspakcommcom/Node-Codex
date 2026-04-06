import { getJson, postJson } from "@platform/internal-http/client";
import { createLogger } from "@platform/observability/logger";
import { ResponseCache } from "@platform/cache/cache-client";
import {
  ConcurrencyGuard,
  TokenBucketRateLimiter,
} from "@platform/performance-controls/admission-control";
import {
  type ProductFeedRequest,
  type ProductFeedResponse,
  type SearchRefreshRequest,
} from "@platform/contracts/feed-api";

const logger = createLogger("public-api");
const cache = new ResponseCache<ProductFeedResponse>();
const rateLimiter = new TokenBucketRateLimiter(60, 30);
const concurrencyGuard = new ConcurrencyGuard(300);

const catalogServiceUrl = process.env.CATALOG_SERVICE_URL ?? "http://catalog-service:4600";
const searchIndexerUrl = process.env.SEARCH_INDEXER_URL ?? "http://search-indexer:4700";

async function handleFeedRequest(
  customerId: string,
  request: ProductFeedRequest,
): Promise<ProductFeedResponse> {
  if (!rateLimiter.allow(customerId)) {
    logger.warn("rate_limit_rejected", {
      customerId,
      route: "/v1/feed",
    });
    throw new Error("429 rate limit exceeded");
  }

  const cacheKey = `${request.region}:${request.category}:${request.page}:${request.pageSize}`;
  const cachedResponse = cache.get(cacheKey);
  if (cachedResponse) {
    logger.info("feed_cache_hit", {
      customerId,
      cacheKey,
    });
    return cachedResponse;
  }

  return concurrencyGuard.run(async () => {
    logger.info("feed_cache_miss", {
      customerId,
      cacheKey,
    });

    const response = await getJson<ProductFeedResponse>(
      `${catalogServiceUrl}/internal/feed?region=${request.region}&category=${request.category}&page=${request.page}&pageSize=${request.pageSize}`,
    );

    cache.set(cacheKey, response, 15_000);

    void postJson<SearchRefreshRequest, { accepted: true }>(
      `${searchIndexerUrl}/internal/index-refresh`,
      {
        reason: "feed_cache_miss",
        category: request.category,
      },
    ).then(() => {
      logger.info("async_index_refresh_scheduled", {
        category: request.category,
      });
    });

    return response;
  });
}

void handleFeedRequest("cus_traffic_10", {
  region: "in",
  category: "electronics",
  page: 1,
  pageSize: 20,
}).then((response) => {
  logger.info("feed_request_completed", {
    itemCount: response.items.length,
    cacheStatus: response.metadata.cacheStatus,
  });
});
