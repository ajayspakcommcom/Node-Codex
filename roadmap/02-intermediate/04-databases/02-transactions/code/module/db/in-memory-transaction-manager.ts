import { cloneState } from "../../shared/transaction-runtime.js";
import type {
  Account,
  DatabaseState,
  InventoryItem,
  IsolationLevel,
  OrderRecord,
  OutboxEvent,
  TransactionMetrics,
  TransactionOptions,
  TransactionResult,
} from "../../shared/transaction-types.js";

export class DeadlockError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = "DeadlockError";
  }
}

export class TransactionFailure extends Error {
  public constructor(
    message: string,
    public readonly causeError: unknown,
    public readonly metrics: TransactionMetrics,
  ) {
    super(message);
    this.name = "TransactionFailure";
  }
}

export class TransactionContext {
  private lockUnits = 0;

  public constructor(
    private readonly workingState: DatabaseState,
    public readonly name: string,
    public readonly isolationLevel: IsolationLevel,
  ) {}

  public recordDatabaseWork(units: number): void {
    this.lockUnits += Math.max(units, 1);
  }

  public currentLockUnits(): number {
    return this.lockUnits;
  }

  public readAccount(id: string): Account | undefined {
    this.recordDatabaseWork(1);
    const account = this.workingState.accounts.find((candidate) => candidate.id === id);
    return account === undefined ? undefined : { ...account };
  }

  public writeAccount(account: Account): void {
    this.recordDatabaseWork(1);
    const index = this.workingState.accounts.findIndex((candidate) => candidate.id === account.id);

    if (index === -1) {
      throw new Error(`Account ${account.id} was not found.`);
    }

    this.workingState.accounts[index] = { ...account };
  }

  public readInventory(sku: string): InventoryItem | undefined {
    this.recordDatabaseWork(1);
    const inventory = this.workingState.inventories.find((candidate) => candidate.sku === sku);
    return inventory === undefined ? undefined : { ...inventory };
  }

  public writeInventory(inventory: InventoryItem): void {
    this.recordDatabaseWork(1);
    const index = this.workingState.inventories.findIndex((candidate) => candidate.sku === inventory.sku);

    if (index === -1) {
      throw new Error(`Inventory ${inventory.sku} was not found.`);
    }

    this.workingState.inventories[index] = { ...inventory };
  }

  public insertOrder(order: Omit<OrderRecord, "id">): OrderRecord {
    this.recordDatabaseWork(2);
    const createdOrder: OrderRecord = {
      id: `ord_${this.workingState.orders.length + 1}`,
      ...order,
    };

    this.workingState.orders.push(createdOrder);
    return { ...createdOrder };
  }

  public enqueueOutboxEvent(event: Omit<OutboxEvent, "id" | "status">): OutboxEvent {
    this.recordDatabaseWork(1);
    const createdEvent: OutboxEvent = {
      id: `evt_${this.workingState.outboxEvents.length + 1}`,
      status: "pending",
      ...event,
    };

    this.workingState.outboxEvents.push(createdEvent);
    return { ...createdEvent };
  }

  public listPendingOutboxEvents(): readonly OutboxEvent[] {
    this.recordDatabaseWork(1);

    return this.workingState.outboxEvents
      .filter((event) => event.status === "pending")
      .map((event) => ({ ...event }));
  }

  public markOutboxDelivered(id: string): void {
    this.recordDatabaseWork(1);
    const index = this.workingState.outboxEvents.findIndex((event) => event.id === id);

    if (index === -1) {
      throw new Error(`Outbox event ${id} was not found.`);
    }

    const event = this.workingState.outboxEvents[index];
    this.workingState.outboxEvents[index] = {
      ...event,
      status: "delivered",
    };
  }

  public exportState(): DatabaseState {
    return cloneState(this.workingState);
  }
}

export class InMemoryTransactionManager {
  private state: DatabaseState;
  private readonly deadlockScenarios = new Map<string, number>();

  public constructor(seedState: DatabaseState) {
    this.state = cloneState(seedState);
  }

  public snapshot(): DatabaseState {
    return cloneState(this.state);
  }

  public configureDeadlock(transactionName: string, failuresBeforeSuccess: number): void {
    this.deadlockScenarios.set(transactionName, failuresBeforeSuccess);
  }

  public runInTransaction<T>(
    options: TransactionOptions,
    work: (transaction: TransactionContext) => T,
  ): TransactionResult<T> {
    const maxRetries = options.maxRetries ?? 0;
    let attempts = 0;

    while (true) {
      attempts += 1;
      const transaction = new TransactionContext(cloneState(this.state), options.name, options.isolationLevel);

      try {
        const value = work(transaction);
        const remainingDeadlockFailures = this.deadlockScenarios.get(options.name) ?? 0;

        if (remainingDeadlockFailures > 0) {
          this.deadlockScenarios.set(options.name, remainingDeadlockFailures - 1);
          throw new DeadlockError(`Deadlock detected while committing ${options.name}.`);
        }

        this.state = transaction.exportState();

        return {
          value,
          metrics: {
            name: options.name,
            isolationLevel: options.isolationLevel,
            attempts,
            lockUnits: this.weightLockUnits(transaction.currentLockUnits(), options.isolationLevel),
            committed: true,
            rolledBack: false,
          },
        };
      } catch (error: unknown) {
        const shouldRetry = error instanceof DeadlockError && attempts <= maxRetries;

        if (shouldRetry) {
          continue;
        }

        throw new TransactionFailure(
          `${options.name} failed and rolled back.`,
          error,
          {
            name: options.name,
            isolationLevel: options.isolationLevel,
            attempts,
            lockUnits: this.weightLockUnits(transaction.currentLockUnits(), options.isolationLevel),
            committed: false,
            rolledBack: true,
            rollbackReason: error instanceof Error ? error.message : "Unknown transaction failure.",
          },
        );
      }
    }
  }

  private weightLockUnits(lockUnits: number, isolationLevel: IsolationLevel): number {
    if (isolationLevel === "serializable") {
      return lockUnits * 3;
    }

    if (isolationLevel === "repeatable-read") {
      return lockUnits * 2;
    }

    return lockUnits;
  }
}
