export type OrderEvent =
  | {
      readonly type: "order-created";
      readonly version: 1;
      readonly payload: {
        readonly orderId: string;
        readonly customerId: string;
        readonly totalInCents: number;
      };
    }
  | {
      readonly type: "order-confirmed";
      readonly version: 1;
      readonly payload: {
        readonly orderId: string;
      };
    };

export interface OrderSnapshot {
  readonly orderId: string;
  readonly customerId: string;
  readonly totalInCents: number;
  readonly status: "pending" | "confirmed";
}
