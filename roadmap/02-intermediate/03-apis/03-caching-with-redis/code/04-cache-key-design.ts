import { RedisLikeClient } from "./module/clients/redis-like-client.js";
import { ProductCache } from "./module/cache/product-cache.js";
import { logger } from "./shared/logger.js";

const cache = new ProductCache(new RedisLikeClient(), {
  keyPrefix: "enterprise-api",
  productTtlMs: 60_000,
  catalogTtlMs: 120_000,
});

const keyExamples = {
  productKey: cache.buildProductKey("tenant_alpha", "prd_1001"),
  catalogKey: cache.buildCatalogKey("tenant_alpha"),
  explanation: "Keys include prefix, resource, tenant scope, resource identity, and version context to avoid collisions and stale confusion.",
};

logger.info("Cache key design", {
  keyExamples,
  guidance: "Enterprise cache keys should reflect tenant and version boundaries explicitly so cached data stays isolated and understandable.",
});
