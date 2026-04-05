import { RedisLikeClient } from "./module/clients/redis-like-client.js";
import { ProductCache } from "./module/cache/product-cache.js";
import { ProductController } from "./module/controllers/product-controller.js";
import { ProductRepository } from "./module/repositories/product-repository.js";
import { ProductService } from "./module/services/product-service.js";
import { CacheMetrics, sleep } from "./shared/cache-runtime.js";
import { logger } from "./shared/logger.js";

void main();

async function main(): Promise<void> {
  const repository = new ProductRepository();
  const cacheMetrics = new CacheMetrics();
  const controller = new ProductController(
    new ProductService(
      repository,
      new ProductCache(new RedisLikeClient(), {
        keyPrefix: "ttl-demo",
        productTtlMs: 15,
        catalogTtlMs: 120_000,
      }),
      cacheMetrics,
      { enableStampedeProtection: true },
    ),
  );

  const firstRead = await controller.getProduct({
    params: {
      tenantId: "tenant_alpha",
      productId: "prd_1001",
    },
  });

  await sleep(25);

  const secondReadAfterExpiry = await controller.getProduct({
    params: {
      tenantId: "tenant_alpha",
      productId: "prd_1001",
    },
  });

  logger.info("TTL strategy", {
    firstRead,
    secondReadAfterExpiry,
    cacheMetrics: cacheMetrics.snapshot(),
    repositoryMetrics: repository.snapshotMetrics(),
    ttlExamples: {
      productDetails: "shorter TTL because price and inventory can change",
      catalogResponse: "longer TTL when broad list freshness is acceptable for a short period",
      verificationCode: "very short TTL because correctness and security matter more than hit rate",
    },
    guidance: "TTL should reflect freshness tolerance and update frequency rather than arbitrary numbers.",
  });
}
