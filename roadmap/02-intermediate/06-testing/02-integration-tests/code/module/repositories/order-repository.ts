import type { OrderRecord } from "../../shared/integration-types.js";
import type { TransactionContext } from "../db/in-memory-database.js";

export class OrderRepository {
  public constructor(private readonly transaction: TransactionContext) {}

  public async save(order: OrderRecord): Promise<void> {
    this.transaction.insertOrder(order);
  }

  public async findById(orderId: string): Promise<OrderRecord | undefined> {
    return this.transaction.getOrder(orderId);
  }

  public async listByTenant(tenantId: string): Promise<readonly OrderRecord[]> {
    return this.transaction.listOrders().filter((order) => order.tenantId === tenantId);
  }
}
