import { RedisUnavailableError } from "../clients/failing-redis-client.js";
import { ProductCache } from "../cache/product-cache.js";
import { ProductRepository, toProductDto } from "../repositories/product-repository.js";
import type { CacheMetrics, } from "../../shared/cache-runtime.js";
import type { ProductDto } from "../../shared/cache-types.js";

export interface ProductServiceOptions {
  readonly enableStampedeProtection: boolean;
}

export class ProductService {
  private readonly inFlightLoads = new Map<string, Promise<ProductDto>>();

  public constructor(
    private readonly productRepository: ProductRepository,
    private readonly productCache: ProductCache,
    private readonly cacheMetrics: CacheMetrics,
    private readonly options: ProductServiceOptions,
  ) {}

  public async getProduct(tenantId: string, productId: string): Promise<ProductDto> {
    const cacheKey = this.productCache.buildProductKey(tenantId, productId);

    try {
      const cachedProduct = await this.productCache.getProduct(tenantId, productId);

      if (cachedProduct !== undefined) {
        this.cacheMetrics.recordHit("product");
        return cachedProduct;
      }

      this.cacheMetrics.recordMiss("product");
    } catch (error) {
      if (!(error instanceof RedisUnavailableError)) {
        throw error;
      }

      this.cacheMetrics.recordFallback("product-read-bypass");
    }

    if (this.options.enableStampedeProtection) {
      const existingLoad = this.inFlightLoads.get(cacheKey);

      if (existingLoad !== undefined) {
        return existingLoad;
      }
    }

    const loadPromise = this.loadAndCacheProduct(tenantId, productId);

    if (this.options.enableStampedeProtection) {
      this.inFlightLoads.set(cacheKey, loadPromise);
    }

    try {
      return await loadPromise;
    } finally {
      this.inFlightLoads.delete(cacheKey);
    }
  }

  public async getCatalog(tenantId: string): Promise<readonly ProductDto[]> {
    try {
      const cachedCatalog = await this.productCache.getCatalog(tenantId);

      if (cachedCatalog !== undefined) {
        this.cacheMetrics.recordHit("catalog");
        return cachedCatalog;
      }

      this.cacheMetrics.recordMiss("catalog");
    } catch (error) {
      if (!(error instanceof RedisUnavailableError)) {
        throw error;
      }

      this.cacheMetrics.recordFallback("catalog-read-bypass");
    }

    const products = (await this.productRepository.listByTenant(tenantId)).map(toProductDto);

    try {
      await this.productCache.setCatalog(tenantId, products);
    } catch (error) {
      if (!(error instanceof RedisUnavailableError)) {
        throw error;
      }

      this.cacheMetrics.recordFallback("catalog-write-bypass");
    }

    return products;
  }

  public async updatePrice(tenantId: string, productId: string, priceInCents: number): Promise<ProductDto> {
    const updatedProduct = toProductDto(await this.productRepository.updatePrice(tenantId, productId, priceInCents));

    try {
      await this.productCache.invalidateProduct(tenantId, productId);
      this.cacheMetrics.recordInvalidation("product");
      await this.productCache.invalidateCatalog(tenantId);
      this.cacheMetrics.recordInvalidation("catalog");
    } catch (error) {
      if (!(error instanceof RedisUnavailableError)) {
        throw error;
      }

      this.cacheMetrics.recordFallback("cache-invalidation-bypass");
    }

    return updatedProduct;
  }

  private async loadAndCacheProduct(tenantId: string, productId: string): Promise<ProductDto> {
    const productRecord = await this.productRepository.findById(tenantId, productId);

    if (productRecord === undefined) {
      throw new Error("Product not found.");
    }

    const product = toProductDto(productRecord);

    try {
      await this.productCache.setProduct(product);
    } catch (error) {
      if (!(error instanceof RedisUnavailableError)) {
        throw error;
      }

      this.cacheMetrics.recordFallback("product-write-bypass");
    }

    return product;
  }
}
