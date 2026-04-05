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
        keyPrefix: "invalidation-demo",
        productTtlMs: 60_000,
        catalogTtlMs: 60_000,
      }),
      cacheMetrics,
      { enableStampedeProtection: true },
    ),
  );

  const initialRead = await controller.getProduct({
    params: {
      tenantId: "tenant_alpha",
      productId: "prd_1001",
    },
  });

  const updatedProduct = await controller.updatePrice({
    params: {
      tenantId: "tenant_alpha",
      productId: "prd_1001",
    },
    body: {
      priceInCents: 139900,
    },
  });

  const freshReadAfterInvalidation = await controller.getProduct({
    params: {
      tenantId: "tenant_alpha",
      productId: "prd_1001",
    },
  });

  logger.info("Invalidation on write", {
    initialRead,
    updatedProduct,
    freshReadAfterInvalidation,
    cacheMetrics: cacheMetrics.snapshot(),
    repositoryMetrics: repository.snapshotMetrics(),
    guidance: "Write operations should invalidate affected keys so cache does not keep serving a stale product after source-of-truth data changes.",
  });
}
