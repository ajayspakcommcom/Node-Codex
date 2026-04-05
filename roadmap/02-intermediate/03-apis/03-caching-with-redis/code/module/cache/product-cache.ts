import type { CacheClient, ProductDto } from "../../shared/cache-types.js";
import { buildCacheKey } from "../../shared/cache-runtime.js";

export interface ProductCacheConfig {
  readonly keyPrefix: string;
  readonly productTtlMs: number;
  readonly catalogTtlMs: number;
}

export class ProductCache {
  public constructor(
    private readonly cacheClient: CacheClient,
    private readonly config: ProductCacheConfig,
  ) {}

  public async getProduct(tenantId: string, productId: string): Promise<ProductDto | undefined> {
    const value = await this.cacheClient.get(this.buildProductKey(tenantId, productId));
    return value === undefined ? undefined : (JSON.parse(value) as ProductDto);
  }

  public async setProduct(product: ProductDto): Promise<void> {
    await this.cacheClient.set(
      this.buildProductKey(product.tenantId, product.id),
      JSON.stringify(product),
      this.config.productTtlMs,
    );
  }

  public async invalidateProduct(tenantId: string, productId: string): Promise<void> {
    await this.cacheClient.delete(this.buildProductKey(tenantId, productId));
  }

  public async getCatalog(tenantId: string): Promise<readonly ProductDto[] | undefined> {
    const value = await this.cacheClient.get(this.buildCatalogKey(tenantId));
    return value === undefined ? undefined : (JSON.parse(value) as readonly ProductDto[]);
  }

  public async setCatalog(tenantId: string, products: readonly ProductDto[]): Promise<void> {
    await this.cacheClient.set(
      this.buildCatalogKey(tenantId),
      JSON.stringify(products),
      this.config.catalogTtlMs,
    );
  }

  public async invalidateCatalog(tenantId: string): Promise<void> {
    await this.cacheClient.delete(this.buildCatalogKey(tenantId));
  }

  public buildProductKey(tenantId: string, productId: string): string {
    return buildCacheKey(this.config.keyPrefix, "product", tenantId, productId, "v1");
  }

  public buildCatalogKey(tenantId: string): string {
    return buildCacheKey(this.config.keyPrefix, "catalog", tenantId, "v1");
  }
}
