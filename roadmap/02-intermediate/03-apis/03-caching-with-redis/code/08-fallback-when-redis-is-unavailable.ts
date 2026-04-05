import { FailingRedisClient } from "./module/clients/failing-redis-client.js";
import { ProductCache } from "./module/cache/product-cache.js";
import { ProductController } from "./module/controllers/product-controller.js";
import { ProductRepository } from "./module/repositories/product-repository.js";
import { ProductService } from "./module/services/product-service.js";
import { CacheMetrics } from "./shared/cache-runtime.js";
import { logger } from "./shared/logger.js";

void main();

async function main(): Promise<void> {
  const repository = new ProductRepository();
  const cacheMetrics = new CacheMetrics();
  const controller = new ProductController(
    new ProductService(
      repository,
      new ProductCache(new FailingRedisClient(), {
        keyPrefix: "redis-down-demo",
        productTtlMs: 60_000,
        catalogTtlMs: 60_000,
      }),
      cacheMetrics,
      { enableStampedeProtection: true },
    ),
  );

  const responseWhenRedisIsUnavailable = await controller.getProduct({
    params: {
      tenantId: "tenant_alpha",
      productId: "prd_1001",
    },
  });

  logger.warn("Fallback when Redis is unavailable", {
    responseWhenRedisIsUnavailable,
    cacheMetrics: cacheMetrics.snapshot(),
    repositoryMetrics: repository.snapshotMetrics(),
    guidance: "When Redis is unavailable, the service can bypass cache and still serve source-of-truth data if that failure mode is acceptable for the endpoint.",
  });
}
