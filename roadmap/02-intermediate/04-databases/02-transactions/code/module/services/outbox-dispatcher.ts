import { InMemoryTransactionManager } from "../db/in-memory-transaction-manager.js";
import { OutboxRepository } from "../repositories/outbox-repository.js";
import type { TransactionMetrics } from "../../shared/transaction-types.js";

export class OutboxDispatcher {
  public constructor(
    private readonly transactionManager: InMemoryTransactionManager,
    private readonly outboxRepository: OutboxRepository,
  ) {}

  public dispatchPendingEvents(): {
    readonly dispatchedTopics: readonly string[];
    readonly pendingCountBeforeDispatch: number;
    readonly deliveryMetrics: TransactionMetrics | null;
  } {
    const pendingEvents = this.transactionManager
      .snapshot()
      .outboxEvents.filter((event) => event.status === "pending");

    if (pendingEvents.length === 0) {
      return {
        dispatchedTopics: [],
        pendingCountBeforeDispatch: 0,
        deliveryMetrics: null,
      };
    }

    const deliveryResult = this.transactionManager.runInTransaction(
      {
        name: "dispatch-outbox-events",
        isolationLevel: "read-committed",
      },
      (transaction) => {
        for (const event of pendingEvents) {
          this.outboxRepository.markDelivered(transaction, event.id);
        }

        return pendingEvents.map((event) => event.topic);
      },
    );

    return {
      dispatchedTopics: deliveryResult.value,
      pendingCountBeforeDispatch: pendingEvents.length,
      deliveryMetrics: deliveryResult.metrics,
    };
  }
}
