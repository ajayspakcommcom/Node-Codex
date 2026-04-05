import { cacheRuntime } from "../../shared/api-cache-runtime.js";
import type { CatalogResponse, ProductDto } from "../../shared/api-cache-types.js";

interface CacheClientLike {
  get<TValue>(key: string, nowEpochSeconds: number): Promise<TValue | undefined>;
  set<TValue>(key: string, value: TValue, expiresAtEpochSeconds: number): Promise<void>;
  delete(key: string): Promise<void>;
}

export class CatalogCache {
  public constructor(private readonly cacheClient: CacheClientLike) {}

  public buildProductKey(tenantId: string, productId: string): string {
    return `tenant:${tenantId}:product:${productId}`;
  }

  public buildCatalogKey(tenantId: string): string {
    return `tenant:${tenantId}:catalog:v1`;
  }

  public async getProduct(tenantId: string, productId: string, nowEpochSeconds: number): Promise<ProductDto | undefined> {
    return this.cacheClient.get<ProductDto>(this.buildProductKey(tenantId, productId), nowEpochSeconds);
  }

  public async setProduct(product: ProductDto, nowEpochSeconds: number): Promise<void> {
    await this.cacheClient.set(this.buildProductKey(product.tenantId, product.id), product, nowEpochSeconds + cacheRuntime.productTtlSeconds);
  }

  public async invalidateProduct(tenantId: string, productId: string): Promise<void> {
    await this.cacheClient.delete(this.buildProductKey(tenantId, productId));
  }

  public async getCatalog(tenantId: string, nowEpochSeconds: number): Promise<CatalogResponse | undefined> {
    return this.cacheClient.get<CatalogResponse>(this.buildCatalogKey(tenantId), nowEpochSeconds);
  }

  public async setCatalog(response: CatalogResponse, nowEpochSeconds: number): Promise<void> {
    await this.cacheClient.set(this.buildCatalogKey(response.tenantId), response, nowEpochSeconds + cacheRuntime.catalogTtlSeconds);
  }

  public async invalidateCatalog(tenantId: string): Promise<void> {
    await this.cacheClient.delete(this.buildCatalogKey(tenantId));
  }
}
