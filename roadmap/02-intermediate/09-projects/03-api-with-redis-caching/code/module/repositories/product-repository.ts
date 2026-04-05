import type { ProductDto, ProductRecord } from "../../shared/api-cache-types.js";

export function toProductDto(record: ProductRecord): ProductDto {
  return {
    id: record.id,
    tenantId: record.tenantId,
    sku: record.sku,
    name: record.name,
    category: record.category,
    priceInCents: record.priceInCents,
    updatedAtEpochSeconds: record.updatedAtEpochSeconds,
  };
}

export class ProductRepository {
  private readonly products = new Map<string, ProductRecord>();

  public constructor(seedProducts: readonly ProductRecord[]) {
    for (const product of seedProducts) {
      this.products.set(product.id, { ...product });
    }
  }

  public async findById(tenantId: string, productId: string): Promise<ProductRecord | undefined> {
    const product = this.products.get(productId);

    if (product === undefined || product.tenantId !== tenantId) {
      return undefined;
    }

    return { ...product };
  }

  public async listByTenant(tenantId: string): Promise<readonly ProductRecord[]> {
    return [...this.products.values()]
      .filter((product) => product.tenantId === tenantId)
      .map((product) => ({ ...product }))
      .sort((left, right) => left.name.localeCompare(right.name));
  }

  public async updatePrice(input: {
    readonly tenantId: string;
    readonly productId: string;
    readonly priceInCents: number;
    readonly nowEpochSeconds: number;
  }): Promise<ProductRecord> {
    const existing = await this.findById(input.tenantId, input.productId);

    if (existing === undefined) {
      throw new Error("Product not found.");
    }

    const updated: ProductRecord = {
      ...existing,
      priceInCents: input.priceInCents,
      updatedAtEpochSeconds: input.nowEpochSeconds,
    };

    this.products.set(updated.id, updated);
    return { ...updated };
  }
}
