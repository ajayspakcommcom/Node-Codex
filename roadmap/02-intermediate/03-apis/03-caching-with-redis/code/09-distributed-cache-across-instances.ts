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

  const instanceOne = new ProductController(
    new ProductService(
      repository,
      new ProductCache(new RedisLikeClient(), {
        keyPrefix: "distributed-cache-demo",
        productTtlMs: 60_000,
        catalogTtlMs: 60_000,
      }),
      new CacheMetrics(),
      { enableStampedeProtection: true },
    ),
  );

  const instanceTwo = new ProductController(
    new ProductService(
      repository,
      new ProductCache(new RedisLikeClient(), {
        keyPrefix: "distributed-cache-demo",
        productTtlMs: 60_000,
        catalogTtlMs: 60_000,
      }),
      new CacheMetrics(),
      { enableStampedeProtection: true },
    ),
  );

  const firstInstanceResponse = await instanceOne.getProduct({
    params: {
      tenantId: "tenant_alpha",
      productId: "prd_1002",
    },
  });

  const secondInstanceResponse = await instanceTwo.getProduct({
    params: {
      tenantId: "tenant_alpha",
      productId: "prd_1002",
    },
  });

  logger.info("Distributed cache across instances", {
    firstInstanceResponse,
    secondInstanceResponse,
    repositoryMetrics: repository.snapshotMetrics(),
    guidance: "A shared Redis cache lets multiple application instances benefit from the same cached data instead of repeating the same source read independently.",
  });
}
