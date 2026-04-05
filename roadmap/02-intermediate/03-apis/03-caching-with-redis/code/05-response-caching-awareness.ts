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
        keyPrefix: "response-cache-demo",
        productTtlMs: 60_000,
        catalogTtlMs: 60_000,
      }),
      cacheMetrics,
      { enableStampedeProtection: true },
    ),
  );

  const firstCatalogResponse = await controller.listCatalog({
    params: {
      tenantId: "tenant_alpha",
    },
  });

  const secondCatalogResponse = await controller.listCatalog({
    params: {
      tenantId: "tenant_alpha",
    },
  });

  logger.info("Response caching awareness", {
    firstCatalogResponse,
    secondCatalogResponse,
    cacheMetrics: cacheMetrics.snapshot(),
    repositoryMetrics: repository.snapshotMetrics(),
    guidance: "Sometimes caching a fully shaped response is useful, but the response contract and invalidation rules must stay explicit.",
  });
}
