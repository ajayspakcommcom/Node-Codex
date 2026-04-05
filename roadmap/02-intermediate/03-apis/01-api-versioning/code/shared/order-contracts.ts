export type ApiVersion = "v1" | "v2";

export interface CreateOrderInput {
  readonly customerId: string;
  readonly amountInCents: number;
  readonly currency: "USD" | "EUR";
  readonly priority: "standard" | "expedited";
}

export interface OrderRecord {
  readonly id: string;
  readonly customerId: string;
  readonly amountInCents: number;
  readonly currency: "USD" | "EUR";
  readonly priority: "standard" | "expedited";
  readonly status: "pending" | "approved";
  readonly createdAt: string;
}

export interface V1CreateOrderRequest {
  readonly customerId: string;
  readonly totalInCents: number;
  readonly rush?: boolean;
}

export interface V2CreateOrderRequest {
  readonly customerId: string;
  readonly total: {
    readonly amountInCents: number;
    readonly currency: "USD" | "EUR";
  };
  readonly fulfillmentPriority?: "standard" | "expedited";
}

export interface V1OrderDto {
  readonly id: string;
  readonly totalInCents: number;
  readonly status: "pending" | "approved";
  readonly isRush: boolean;
}

export interface V2OrderDto {
  readonly id: string;
  readonly total: {
    readonly amountInCents: number;
    readonly currency: "USD" | "EUR";
  };
  readonly status: "pending" | "approved";
  readonly fulfillment: {
    readonly priority: "standard" | "expedited";
  };
  readonly createdAt: string;
}
