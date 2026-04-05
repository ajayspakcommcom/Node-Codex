export interface ProductRecord {
  readonly id: string;
  readonly tenantId: string;
  readonly sku: string;
  readonly name: string;
  readonly category: string;
  readonly priceInCents: number;
  readonly updatedAtEpochSeconds: number;
}

export interface ProductDto {
  readonly id: string;
  readonly tenantId: string;
  readonly sku: string;
  readonly name: string;
  readonly category: string;
  readonly priceInCents: number;
  readonly updatedAtEpochSeconds: number;
}

export interface CatalogResponse {
  readonly tenantId: string;
  readonly items: readonly ProductDto[];
  readonly generatedAtEpochSeconds: number;
}

export interface CachedValue<TValue> {
  readonly value: TValue;
  readonly expiresAtEpochSeconds: number;
}
