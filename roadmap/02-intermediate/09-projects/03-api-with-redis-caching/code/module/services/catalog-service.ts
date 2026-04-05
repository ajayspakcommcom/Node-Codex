import { RedisUnavailableError } from "../clients/failing-redis-client.js";
import { CatalogCache } from "../cache/catalog-cache.js";
import { ProductRepository, toProductDto } from "../repositories/product-repository.js";
import { CacheMetricsService } from "./cache-metrics-service.js";
import type { CatalogResponse, ProductDto } from "../../shared/api-cache-types.js";

export interface CatalogServiceOptions {
  readonly stampedeProtection: boolean;
}

export class CatalogService {
  private readonly inFlightProductLoads = new Map<string, Promise<ProductDto>>();

  public constructor(
    private readonly productRepository: ProductRepository,
    private readonly catalogCache: CatalogCache,
    private readonly metrics: CacheMetricsService,
    private readonly options: CatalogServiceOptions,
  ) {}

  public async getProduct(input: {
    readonly tenantId: string;
    readonly productId: string;
    readonly nowEpochSeconds: number;
  }): Promise<ProductDto> {
    try {
      const cached = await this.catalogCache.getProduct(input.tenantId, input.productId, input.nowEpochSeconds);

      if (cached !== undefined) {
        this.metrics.recordHit("product");
        return cached;
      }

      this.metrics.recordMiss("product");
    } catch (error) {
      if (!(error instanceof RedisUnavailableError)) {
        throw error;
      }

      this.metrics.recordFallback("product-read-bypass");
    }

    const key = `${input.tenantId}:${input.productId}`;
    if (this.options.stampedeProtection) {
      const existing = this.inFlightProductLoads.get(key);

      if (existing !== undefined) {
        return existing;
      }
    }

    const loadPromise = this.loadAndCacheProduct(input);
    if (this.options.stampedeProtection) {
      this.inFlightProductLoads.set(key, loadPromise);
    }

    try {
      return await loadPromise;
    } finally {
      this.inFlightProductLoads.delete(key);
    }
  }

  public async getCatalog(input: {
    readonly tenantId: string;
    readonly nowEpochSeconds: number;
  }): Promise<CatalogResponse> {
    try {
      const cached = await this.catalogCache.getCatalog(input.tenantId, input.nowEpochSeconds);

      if (cached !== undefined) {
        this.metrics.recordHit("catalog");
        return cached;
      }

      this.metrics.recordMiss("catalog");
    } catch (error) {
      if (!(error instanceof RedisUnavailableError)) {
        throw error;
      }

      this.metrics.recordFallback("catalog-read-bypass");
    }

    const items = (await this.productRepository.listByTenant(input.tenantId)).map(toProductDto);
    const response: CatalogResponse = {
      tenantId: input.tenantId,
      items,
      generatedAtEpochSeconds: input.nowEpochSeconds,
    };

    try {
      await this.catalogCache.setCatalog(response, input.nowEpochSeconds);
    } catch (error) {
      if (!(error instanceof RedisUnavailableError)) {
        throw error;
      }

      this.metrics.recordFallback("catalog-write-bypass");
    }

    return response;
  }

  public async updatePrice(input: {
    readonly tenantId: string;
    readonly productId: string;
    readonly priceInCents: number;
    readonly nowEpochSeconds: number;
  }): Promise<ProductDto> {
    const updated = toProductDto(await this.productRepository.updatePrice(input));

    try {
      await this.catalogCache.invalidateProduct(input.tenantId, input.productId);
      this.metrics.recordInvalidation("product");
      await this.catalogCache.invalidateCatalog(input.tenantId);
      this.metrics.recordInvalidation("catalog");
    } catch (error) {
      if (!(error instanceof RedisUnavailableError)) {
        throw error;
      }

      this.metrics.recordFallback("cache-invalidation-bypass");
    }

    return updated;
  }

  public metricsSnapshot() {
    return this.metrics.snapshot();
  }

  private async loadAndCacheProduct(input: {
    readonly tenantId: string;
    readonly productId: string;
    readonly nowEpochSeconds: number;
  }): Promise<ProductDto> {
    const product = await this.productRepository.findById(input.tenantId, input.productId);

    if (product === undefined) {
      throw new Error("Product not found.");
    }

    const dto = toProductDto(product);

    try {
      await this.catalogCache.setProduct(dto, input.nowEpochSeconds);
    } catch (error) {
      if (!(error instanceof RedisUnavailableError)) {
        throw error;
      }

      this.metrics.recordFallback("product-write-bypass");
    }

    return dto;
  }
}
