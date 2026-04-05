import { TransactionContext } from "../db/in-memory-transaction-manager.js";
import type { OutboxEvent, OrderRecord } from "../../shared/transaction-types.js";

export class OutboxRepository {
  public enqueueOrderPlaced(transaction: TransactionContext, order: OrderRecord): OutboxEvent {
    return transaction.enqueueOutboxEvent({
      topic: "order.placed",
      payload: {
        orderId: order.id,
        userId: order.userId,
        sku: order.sku,
        units: order.units,
        totalInCents: order.totalInCents,
      },
    });
  }

  public markDelivered(transaction: TransactionContext, eventId: string): void {
    transaction.markOutboxDelivered(eventId);
  }
}
