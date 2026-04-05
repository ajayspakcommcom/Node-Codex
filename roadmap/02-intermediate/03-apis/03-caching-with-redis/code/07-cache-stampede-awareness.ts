import { RedisLikeClient } from "./module/clients/redis-like-client.js";
import { ProductCache } from "./module/cache/product-cache.js";
import { ProductRepository } from "./module/repositories/product-repository.js";
import { ProductService } from "./module/services/product-service.js";
import { CacheMetrics } from "./shared/cache-runtime.js";
import { logger } from "./shared/logger.js";

void main();

async function main(): Promise<void> {
  const naiveRepository = new ProductRepository();
  const protectedRepository = new ProductRepository();

  const naiveService = new ProductService(
    naiveRepository,
    new ProductCache(new RedisLikeClient(), {
      keyPrefix: "stampede-naive",
      productTtlMs: 60_000,
      catalogTtlMs: 60_000,
    }),
    new CacheMetrics(),
    { enableStampedeProtection: false },
  );

  const protectedService = new ProductService(
    protectedRepository,
    new ProductCache(new RedisLikeClient(), {
      keyPrefix: "stampede-protected",
      productTtlMs: 60_000,
      catalogTtlMs: 60_000,
    }),
    new CacheMetrics(),
    { enableStampedeProtection: true },
  );

  await Promise.all([
    naiveService.getProduct("tenant_alpha", "prd_1001"),
    naiveService.getProduct("tenant_alpha", "prd_1001"),
    naiveService.getProduct("tenant_alpha", "prd_1001"),
  ]);

  await Promise.all([
    protectedService.getProduct("tenant_alpha", "prd_1001"),
    protectedService.getProduct("tenant_alpha", "prd_1001"),
    protectedService.getProduct("tenant_alpha", "prd_1001"),
  ]);

  logger.warn("Cache stampede awareness", {
    naiveRepositoryMetrics: naiveRepository.snapshotMetrics(),
    protectedRepositoryMetrics: protectedRepository.snapshotMetrics(),
    guidance: "Without coordination, concurrent misses can hit the source system repeatedly. Stampede protection keeps one load in flight for the same hot key.",
  });
}
