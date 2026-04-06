export interface ProductFeedRequest {
  readonly region: string;
  readonly category: string;
  readonly page: number;
  readonly pageSize: number;
}

export interface ProductFeedItem {
  readonly sku: string;
  readonly title: string;
  readonly priceInCents: number;
  readonly available: boolean;
}

export interface ProductFeedResponse {
  readonly items: readonly ProductFeedItem[];
  readonly metadata: {
    readonly region: string;
    readonly category: string;
    readonly page: number;
    readonly pageSize: number;
    readonly cacheStatus: "hit" | "miss";
  };
}

export interface SearchRefreshRequest {
  readonly reason: "feed_cache_miss" | "manual_invalidation";
  readonly category: string;
}
