import { TransactionContext } from "../db/in-memory-transaction-manager.js";
import type { OrderRecord } from "../../shared/transaction-types.js";

export class OrderRepository {
  public createPlacedOrder(
    transaction: TransactionContext,
    order: Omit<OrderRecord, "id" | "status">,
  ): OrderRecord {
    return transaction.insertOrder({
      ...order,
      status: "placed",
    });
  }
}
