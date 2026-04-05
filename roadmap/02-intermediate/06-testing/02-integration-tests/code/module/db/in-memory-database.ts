import type { DatabaseState, OrderRecord, OutboxEvent } from "../../shared/integration-types.js";

function cloneOrders(orders: Map<string, OrderRecord>): Map<string, OrderRecord> {
  return new Map([...orders.entries()].map(([key, value]) => [key, { ...value }]));
}

function cloneOutbox(outbox: readonly OutboxEvent[]): OutboxEvent[] {
  return outbox.map((event) => ({ ...event }));
}

export class InMemoryDatabase {
  private state: DatabaseState;

  public constructor(seedOrders: readonly OrderRecord[] = []) {
    this.state = {
      orders: new Map(seedOrders.map((order) => [order.orderId, { ...order }])),
      outbox: [],
    };
  }

  public async runInTransaction<T>(
    work: (tx: TransactionContext) => Promise<T>,
  ): Promise<T> {
    const workingState: DatabaseState = {
      orders: cloneOrders(this.state.orders),
      outbox: cloneOutbox(this.state.outbox),
    };

    const context = new TransactionContext(workingState);

    try {
      const result = await work(context);
      this.state = context.commit();
      return result;
    } catch (error) {
      throw error;
    }
  }

  public snapshot(): DatabaseState {
    return {
      orders: cloneOrders(this.state.orders),
      outbox: cloneOutbox(this.state.outbox),
    };
  }

  public reset(seedOrders: readonly OrderRecord[] = []): void {
    this.state = {
      orders: new Map(seedOrders.map((order) => [order.orderId, { ...order }])),
      outbox: [],
    };
  }
}

export class TransactionContext {
  public constructor(private readonly state: DatabaseState) {}

  public insertOrder(order: OrderRecord): void {
    this.state.orders.set(order.orderId, order);
  }

  public getOrder(orderId: string): OrderRecord | undefined {
    return this.state.orders.get(orderId);
  }

  public listOrders(): readonly OrderRecord[] {
    return [...this.state.orders.values()];
  }

  public addOutboxEvent(event: OutboxEvent): void {
    this.state.outbox.push(event);
  }

  public listOutboxEvents(): readonly OutboxEvent[] {
    return [...this.state.outbox];
  }

  public commit(): DatabaseState {
    return {
      orders: new Map(this.state.orders),
      outbox: [...this.state.outbox],
    };
  }
}
