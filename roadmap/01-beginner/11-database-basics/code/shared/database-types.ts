export interface UserRow {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly createdAt: string;
  readonly isActive: boolean;
}

export interface ProductRow {
  readonly id: string;
  readonly sku: string;
  readonly name: string;
  readonly priceInCents: number;
  readonly inventoryCount: number;
  readonly createdAt: string;
}

export interface OrderRow {
  readonly id: string;
  readonly userId: string;
  readonly status: "pending" | "confirmed" | "cancelled";
  readonly totalInCents: number;
  readonly createdAt: string;
}

export interface OrderItemRow {
  readonly id: string;
  readonly orderId: string;
  readonly productId: string;
  readonly quantity: number;
  readonly unitPriceInCents: number;
}

export interface ProductDocument {
  readonly _id: string;
  readonly sku: string;
  readonly title: string;
  readonly pricing: {
    readonly amountInCents: number;
    readonly currency: "INR" | "USD";
  };
  readonly inventory: {
    readonly available: number;
    readonly warehouseCode: string;
  };
  readonly tags: readonly string[];
}

export interface ProductDto {
  readonly id: string;
  readonly sku: string;
  readonly name: string;
  readonly priceInCents: number;
  readonly inStock: boolean;
}

export interface ProductFilter {
  readonly isInStock?: boolean;
  readonly minPriceInCents?: number;
  readonly maxPriceInCents?: number;
  readonly search?: string;
}

export interface PaginationInput {
  readonly page: number;
  readonly pageSize: number;
}

export interface PaginatedResult<TItem> {
  readonly items: readonly TItem[];
  readonly page: number;
  readonly pageSize: number;
  readonly totalCount: number;
}
