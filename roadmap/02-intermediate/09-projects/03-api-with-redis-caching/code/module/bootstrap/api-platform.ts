import { cloneSeedProducts } from "../../shared/api-cache-runtime.js";
import { CatalogCache } from "../cache/catalog-cache.js";
import { RedisLikeClient } from "../clients/redis-like-client.js";
import { CatalogController } from "../controllers/catalog-controller.js";
import { ProductRepository } from "../repositories/product-repository.js";
import { CacheMetricsService } from "../services/cache-metrics-service.js";
import { CatalogService } from "../services/catalog-service.js";

export function createApiPlatform(input?: {
  readonly cacheClient?: {
    get<TValue>(key: string, nowEpochSeconds: number): Promise<TValue | undefined>;
    set<TValue>(key: string, value: TValue, expiresAtEpochSeconds: number): Promise<void>;
    delete(key: string): Promise<void>;
  };
  readonly stampedeProtection?: boolean;
}) {
  const cacheClient = input?.cacheClient ?? new RedisLikeClient();
  const repository = new ProductRepository(cloneSeedProducts());
  const cache = new CatalogCache(cacheClient);
  const metrics = new CacheMetricsService();
  const service = new CatalogService(repository, cache, metrics, {
    stampedeProtection: input?.stampedeProtection ?? true,
  });
  const controller = new CatalogController(service);

  return {
    cacheClient,
    repository,
    cache,
    metrics,
    service,
    controller,
  };
}
