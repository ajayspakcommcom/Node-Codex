import type { Notifier, OrderRecord } from "../../shared/mocking-types.js";

export class InvoiceDeliveryService {
  public constructor(private readonly notifier: Notifier) {}

  public async sendFailureNotice(order: OrderRecord, reason: string): Promise<void> {
    if (order.status !== "payment_failed") {
      return;
    }

    await this.notifier.notifyPaymentFailure({
      orderId: order.orderId,
      customerId: order.customerId,
      reason,
    });
  }
}
