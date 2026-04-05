import type { DomainEventPublisher, OutboxEvent } from "../../shared/integration-types.js";
import type { TransactionContext } from "../db/in-memory-database.js";

export class OrderEventService {
  public constructor(
    private readonly transaction: TransactionContext,
    private readonly publisher: DomainEventPublisher,
  ) {}

  public async recordOrderCreated(orderId: string, tenantId: string): Promise<void> {
    const event: OutboxEvent = {
      type: "order.created",
      orderId,
      tenantId,
    };

    this.transaction.addOutboxEvent(event);
  }

  public async flushOutbox(): Promise<void> {
    for (const event of this.transaction.listOutboxEvents()) {
      await this.publisher.publish(event);
    }
  }
}
