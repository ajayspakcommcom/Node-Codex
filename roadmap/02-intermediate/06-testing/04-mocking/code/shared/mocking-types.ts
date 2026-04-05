export interface OrderRecord {
  readonly orderId: string;
  readonly customerId: string;
  readonly totalCents: number;
  readonly status: "pending" | "paid" | "payment_failed";
}

export interface PaymentResult {
  readonly status: "approved" | "declined";
  readonly transactionId?: string;
  readonly reason?: string;
}

export interface OrderRepository {
  save(order: OrderRecord): Promise<void>;
  findById(orderId: string): Promise<OrderRecord | undefined>;
}

export interface PaymentGateway {
  charge(input: {
    readonly orderId: string;
    readonly customerId: string;
    readonly amountCents: number;
  }): Promise<PaymentResult>;
}

export interface Notifier {
  notifyPaymentFailure(input: {
    readonly orderId: string;
    readonly customerId: string;
    readonly reason: string;
  }): Promise<void>;
}

export interface AuditLogger {
  record(event: {
    readonly type: "payment_attempted" | "payment_failed" | "payment_completed";
    readonly orderId: string;
  }): Promise<void>;
}
