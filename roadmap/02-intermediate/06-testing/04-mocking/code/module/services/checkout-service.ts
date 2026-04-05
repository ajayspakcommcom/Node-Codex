import type {
  AuditLogger,
  Notifier,
  OrderRecord,
  OrderRepository,
  PaymentGateway,
} from "../../shared/mocking-types.js";

export class CheckoutService {
  public constructor(
    private readonly orderRepository: OrderRepository,
    private readonly paymentGateway: PaymentGateway,
    private readonly notifier: Notifier,
    private readonly auditLogger: AuditLogger,
  ) {}

  public async checkout(orderId: string): Promise<OrderRecord> {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    await this.auditLogger.record({
      type: "payment_attempted",
      orderId: order.orderId,
    });

    const paymentResult = await this.paymentGateway.charge({
      orderId: order.orderId,
      customerId: order.customerId,
      amountCents: order.totalCents,
    });

    if (paymentResult.status === "declined") {
      const failedOrder: OrderRecord = {
        ...order,
        status: "payment_failed",
      };

      await this.orderRepository.save(failedOrder);
      await this.auditLogger.record({
        type: "payment_failed",
        orderId: order.orderId,
      });
      await this.notifier.notifyPaymentFailure({
        orderId: order.orderId,
        customerId: order.customerId,
        reason: paymentResult.reason ?? "unknown",
      });

      return failedOrder;
    }

    const paidOrder: OrderRecord = {
      ...order,
      status: "paid",
    };

    await this.orderRepository.save(paidOrder);
    await this.auditLogger.record({
      type: "payment_completed",
      orderId: order.orderId,
    });

    return paidOrder;
  }
}
