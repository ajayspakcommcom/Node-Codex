export interface MongoOrder {
  readonly _id: string;
  readonly tenantId: string;
  readonly userId: string;
  readonly status: "draft" | "placed" | "cancelled" | "refunded";
  readonly channel: "web" | "mobile" | "partner";
  readonly region: "IN" | "US" | "EU";
  readonly category: "laptops" | "audio" | "accessories";
  readonly totalInCents: number;
  readonly createdAt: string;
  readonly tags: readonly string[];
  readonly shipping: {
    readonly city: string;
    readonly priority: "standard" | "express";
  };
  readonly metrics: {
    readonly retryCount: number;
    readonly viewCount: number;
  };
}

export interface QueryParameters {
  readonly status?: MongoOrder["status"];
  readonly channel?: MongoOrder["channel"];
  readonly region?: MongoOrder["region"];
  readonly category?: MongoOrder["category"];
  readonly minTotalInCents?: number;
  readonly page?: number;
  readonly pageSize?: number;
  readonly sortBy?: "createdAt" | "totalInCents";
  readonly sortDirection?: "asc" | "desc";
}

export interface FilterDefinition {
  readonly [key: string]: unknown;
}

export interface FindOptions {
  readonly projection?: readonly string[];
  readonly sort?: Readonly<Record<string, 1 | -1>>;
  readonly skip?: number;
  readonly limit?: number;
}

export interface UpdateOperators {
  readonly $set?: Readonly<Record<string, unknown>>;
  readonly $inc?: Readonly<Record<string, number>>;
  readonly $push?: Readonly<Record<string, unknown>>;
}

export interface QueryExecutionSummary {
  readonly matchedCount: number;
  readonly returnedCount: number;
  readonly projectedFieldCount: number;
  readonly usedSkip: number;
  readonly note: string;
}
