import { InMemoryTransactionManager } from "../db/in-memory-transaction-manager.js";
import { AccountRepository } from "../repositories/account-repository.js";
import { InventoryRepository } from "../repositories/inventory-repository.js";
import { OrderRepository } from "../repositories/order-repository.js";
import { OutboxRepository } from "../repositories/outbox-repository.js";
import type { IsolationLevel, OrderRecord, TransactionResult } from "../../shared/transaction-types.js";

export interface PlaceOrderCommand {
  readonly userId: string;
  readonly sku: string;
  readonly units: number;
  readonly totalInCents: number;
  readonly isolationLevel?: IsolationLevel;
  readonly workflowName?: string;
  readonly maxRetries?: number;
  readonly additionalLockUnits?: number;
}

export class OrderPlacementService {
  public constructor(
    private readonly transactionManager: InMemoryTransactionManager,
    private readonly accountRepository: AccountRepository,
    private readonly inventoryRepository: InventoryRepository,
    private readonly orderRepository: OrderRepository,
    private readonly outboxRepository: OutboxRepository,
  ) {}

  public placeOrder(command: PlaceOrderCommand): TransactionResult<{
    readonly order: OrderRecord;
    readonly outboxEventId: string;
  }> {
    return this.transactionManager.runInTransaction(
      {
        name: command.workflowName ?? "place-order",
        isolationLevel: command.isolationLevel ?? "read-committed",
        ...(command.maxRetries === undefined ? {} : { maxRetries: command.maxRetries }),
      },
      (transaction) => {
        this.accountRepository.debit(transaction, command.userId, command.totalInCents);
        this.inventoryRepository.reserve(transaction, command.sku, command.units);

        if (command.additionalLockUnits !== undefined && command.additionalLockUnits > 0) {
          transaction.recordDatabaseWork(command.additionalLockUnits);
        }

        const order = this.orderRepository.createPlacedOrder(transaction, {
          userId: command.userId,
          sku: command.sku,
          units: command.units,
          totalInCents: command.totalInCents,
        });
        const outboxEvent = this.outboxRepository.enqueueOrderPlaced(transaction, order);

        return {
          order,
          outboxEventId: outboxEvent.id,
        };
      },
    );
  }
}
