import { RedisLikeClient } from "./module/clients/redis-like-client.js";
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
      new ProductCache(new RedisLikeClient(), {
        keyPrefix: "cache-aside-demo",
        productTtlMs: 60_000,
        catalogTtlMs: 60_000,
      }),
      cacheMetrics,
      { enableStampedeProtection: true },
    ),
  );

  const firstResponse = await controller.getProduct({
    params: {
      tenantId: "tenant_alpha",
      productId: "prd_1001",
    },
  });

  const secondResponse = await controller.getProduct({
    params: {
      tenantId: "tenant_alpha",
      productId: "prd_1001",
    },
  });

  logger.info("Cache-aside read", {
    firstResponse,
    secondResponse,
    cacheMetrics: cacheMetrics.snapshot(),
    repositoryMetrics: repository.snapshotMetrics(),
    guidance: "The first request misses cache and loads from source. The second request hits the shared cache and avoids another repository read.",
  });
}
