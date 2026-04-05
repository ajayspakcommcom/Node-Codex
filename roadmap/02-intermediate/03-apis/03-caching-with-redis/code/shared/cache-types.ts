export interface CacheClient {
  get(key: string): Promise<string | undefined>;
  set(key: string, value: string, ttlMs: number): Promise<void>;
  delete(key: string): Promise<void>;
}

export interface ProductRecord {
  readonly id: string;
  readonly tenantId: string;
  readonly name: string;
  readonly priceInCents: number;
  readonly inventory: number;
  readonly updatedAt: string;
}

export interface ProductDto {
  readonly id: string;
  readonly tenantId: string;
  readonly name: string;
  readonly priceInCents: number;
  readonly inventory: number;
  readonly updatedAt: string;
}

export interface CacheMetricsSnapshot {
  readonly hits: Readonly<Record<string, number>>;
  readonly misses: Readonly<Record<string, number>>;
  readonly invalidations: Readonly<Record<string, number>>;
  readonly fallbacks: Readonly<Record<string, number>>;
}

export interface RepositoryMetricsSnapshot {
  readonly findByIdCalls: number;
  readonly listCalls: number;
  readonly updateCalls: number;
}
